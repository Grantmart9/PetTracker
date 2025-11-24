/* eslint-disable react/no-unescaped-entities */
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import { motion } from "framer-motion";
import { useAuth } from "@/lib/auth-context";
import Layout from "@/components/Layout";
import { supabase } from "@/lib/supabase";
import type { Database } from "@/supabase/types";
import { Wrapper, Status } from "@googlemaps/react-wrapper";

type Dog = Database["public"]["Tables"]["dogs"]["Row"];
type Location = Database["public"]["Tables"]["locations"]["Row"];

// Google Maps Component
const GoogleMap: React.FC<{
  center: google.maps.LatLngLiteral;
  zoom: number;
  locations: Location[];
  currentLocation?: Location;
}> = ({ center, zoom, locations, currentLocation }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map>();

  useEffect(() => {
    if (ref.current && !map) {
      const newMap = new google.maps.Map(ref.current, {
        center,
        zoom,
        styles: [
          {
            featureType: "poi",
            elementType: "labels",
            stylers: [{ visibility: "off" }],
          },
        ],
      });
      setMap(newMap);
    }
  }, [ref, map, center, zoom]);

  useEffect(() => {
    if (map && locations.length > 0) {
      // Clear existing markers
      const markers: google.maps.Marker[] = [];

      // Add path for location history
      const path = locations.map((loc) => ({
        lat: loc.latitude,
        lng: loc.longitude,
      }));

      const polyline = new google.maps.Polyline({
        path,
        geodesic: true,
        strokeColor: "#3b82f6",
        strokeOpacity: 0.8,
        strokeWeight: 3,
      });
      polyline.setMap(map);

      // Add markers for each location
      locations.forEach((location, index) => {
        const marker = new google.maps.Marker({
          position: { lat: location.latitude, lng: location.longitude },
          map,
          title: `Location ${index + 1} - ${new Date(
            location.timestamp
          ).toLocaleString()}`,
          icon: {
            url:
              "data:image/svg+xml;charset=UTF-8," +
              encodeURIComponent(`
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="10" cy="10" r="8" fill="#3b82f6" stroke="white" stroke-width="2"/>
              </svg>
            `),
            scaledSize: new google.maps.Size(20, 20),
          },
        });
        markers.push(marker);
      });

      // Add current location marker (most recent)
      if (currentLocation) {
        const currentMarker = new google.maps.Marker({
          position: {
            lat: currentLocation.latitude,
            lng: currentLocation.longitude,
          },
          map,
          title: `Current Location - ${new Date(
            currentLocation.timestamp
          ).toLocaleString()}`,
          icon: {
            url:
              "data:image/svg+xml;charset=UTF-8," +
              encodeURIComponent(`
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="10" fill="#10b981" stroke="white" stroke-width="3"/>
                <circle cx="12" cy="12" r="4" fill="white"/>
              </svg>
            `),
            scaledSize: new google.maps.Size(24, 24),
          },
        });
        markers.push(currentMarker);
      }

      // Fit bounds to show all locations
      if (locations.length > 1) {
        const bounds = new google.maps.LatLngBounds();
        locations.forEach((loc) => {
          bounds.extend({ lat: loc.latitude, lng: loc.longitude });
        });
        map.fitBounds(bounds);
      }

      return () => {
        markers.forEach((marker) => marker.setMap(null));
        polyline.setMap(null);
      };
    }
  }, [map, locations, currentLocation]);

  return <div ref={ref} className="w-full h-full rounded-2xl" />;
};

const MapWrapper: React.FC<{
  locations: Location[];
  currentLocation?: Location;
}> = ({ locations, currentLocation }) => {
  const center = currentLocation
    ? { lat: currentLocation.latitude, lng: currentLocation.longitude }
    : locations.length > 0
    ? { lat: locations[0].latitude, lng: locations[0].longitude }
    : { lat: 40.7128, lng: -74.006 }; // Default to NYC

  return (
    <Wrapper
      apiKey="AIzaSyDFqp0PGp-vOy_BLx-ljnGZcUks9VbJgXM"
      libraries={["geometry"]}
    >
      <GoogleMap
        center={center}
        zoom={15}
        locations={locations}
        currentLocation={currentLocation}
      />
    </Wrapper>
  );
};

export default function DogDetail() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const { id } = router.query;
  const [dog, setDog] = useState<Dog | null>(null);
  const [locations, setLocations] = useState<Location[]>([]);
  const [loadingData, setLoadingData] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!loading && !user) {
      router.push("/auth/login");
      return;
    }

    if (user && id && typeof id === "string") {
      fetchDogData();
    }
  }, [user, loading, id, router]);

  const fetchDogData = async () => {
    if (!id || typeof id !== "string") return;

    try {
      // Fetch dog details
      const { data: dogData, error: dogError } = await supabase
        .from("dogs")
        .select("*")
        .eq("id", id)
        .single();

      if (dogError) throw dogError;

      // Verify user owns this dog
      if (dogData.user_id !== user?.id) {
        router.push("/dashboard");
        return;
      }

      setDog(dogData);

      // Fetch location history
      const { data: locationsData, error: locationsError } = await supabase
        .from("locations")
        .select("*")
        .eq("dog_id", id)
        .order("timestamp", { ascending: false })
        .limit(100);

      if (locationsError) throw locationsError;

      setLocations(locationsData || []);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoadingData(false);
    }
  };

  const currentLocation = locations[0]; // Most recent location
  const locationCount = locations.length;

  if (loading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="rounded-full h-16 w-16 border-4 border-blue-600 border-t-transparent"
        />
      </div>
    );
  }

  if (loadingData) {
    return (
      <Layout>
        <div className="text-center py-12">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent mx-auto mb-4"
          />
          <p className="text-gray-600">Loading dog details...</p>
        </div>
      </Layout>
    );
  }

  if (error || !dog) {
    return (
      <Layout>
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🐕</div>
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Dog not found
          </h3>
          <p className="text-gray-600 mb-8">
            {error ||
              "This dog may not exist or you may not have permission to view it."}
          </p>
          <button
            onClick={() => router.push("/dashboard")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold"
          >
            Back to Dashboard
          </button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <Head>
        <title>{dog.name} - PetTrack</title>
      </Head>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="px-4 py-6 sm:px-0"
      >
        {/* Dog Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8"
        >
          <div className="flex items-center gap-6 mb-6">
            {dog.photo_url ? (
              <img
                src={dog.photo_url}
                alt={dog.name}
                className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-lg"
              />
            ) : (
              <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center border-4 border-white shadow-lg">
                <span className="text-3xl">🐕</span>
              </div>
            )}
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {dog.name}
              </h1>
              <div className="flex items-center gap-4 mt-2">
                {dog.breed && (
                  <span className="text-gray-600">
                    <span className="font-medium">Breed:</span> {dog.breed}
                  </span>
                )}
                {dog.collar_id && (
                  <span className="text-gray-600">
                    <span className="font-medium">Collar ID:</span>{" "}
                    {dog.collar_id}
                  </span>
                )}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
        >
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-2xl">📍</span>
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Locations</p>
                <p className="text-2xl font-bold text-gray-900">
                  {locationCount}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-2xl">🕐</span>
              </div>
              <div>
                <p className="text-sm text-gray-600">Last Updated</p>
                <p className="text-lg font-bold text-gray-900">
                  {currentLocation
                    ? new Date(currentLocation.timestamp).toLocaleString()
                    : "No data"}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <span className="text-2xl">📊</span>
              </div>
              <div>
                <p className="text-sm text-gray-600">Status</p>
                <p className="text-lg font-bold text-green-600">
                  {currentLocation ? "Active" : "No Signal"}
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Map Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8"
        >
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900">
              Location Tracking
            </h2>
            <p className="text-gray-600 mt-1">
              Real-time location history and movement path
            </p>
          </div>
          <div className="h-96 w-full">
            {locations.length > 0 ? (
              <MapWrapper
                locations={locations}
                currentLocation={currentLocation}
              />
            ) : (
              <div className="h-full flex items-center justify-center bg-gray-50">
                <div className="text-center">
                  <div className="text-6xl mb-4">🗺️</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    No Location Data
                  </h3>
                  <p className="text-gray-600">
                    Location tracking will appear here once your dog's collar
                    sends data.
                  </p>
                </div>
              </div>
            )}
          </div>
        </motion.div>

        {/* Location History */}
        {locations.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="bg-white rounded-2xl shadow-xl p-6"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Recent Locations
            </h2>
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {locations.slice(0, 20).map((location, index) => (
                <div
                  key={location.id}
                  className={`flex items-center justify-between p-4 rounded-xl ${
                    index === 0
                      ? "bg-green-50 border border-green-200"
                      : "bg-gray-50"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-3 h-3 rounded-full ${
                        index === 0 ? "bg-green-500" : "bg-blue-500"
                      }`}
                    />
                    <div>
                      <p className="font-medium text-gray-900">
                        {index === 0
                          ? "Current Location"
                          : `Location ${index + 1}`}
                      </p>
                      <p className="text-sm text-gray-600">
                        {location.latitude.toFixed(6)},{" "}
                        {location.longitude.toFixed(6)}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600">
                      {new Date(location.timestamp).toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </motion.div>
    </Layout>
  );
}
