import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";
import { motion } from "framer-motion";
import { useAuth } from "@/lib/auth-context";
import Layout from "@/components/Layout";
import { supabase } from "@/lib/supabase";
import type { Database } from "@/supabase/types";

type Dog = Database["public"]["Tables"]["dogs"]["Row"];
type Boundary = Database["public"]["Tables"]["boundaries"]["Row"];

export default function Boundaries() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [dogs, setDogs] = useState<Dog[]>([]);
  const [boundaries, setBoundaries] = useState<Boundary[]>([]);
  const [selectedDog, setSelectedDog] = useState<string>("");
  const [loadingData, setLoadingData] = useState(true);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/auth/login");
      return;
    }

    if (user) {
      fetchDogs();
    }
  }, [user, loading, router]);

  const fetchDogs = async () => {
    try {
      const { data: dogsData, error: dogsError } = await supabase
        .from("dogs")
        .select("*")
        .order("name");

      if (dogsError) throw dogsError;

      const { data: boundariesData, error: boundariesError } = await supabase
        .from("boundaries")
        .select("*")
        .order("created_at", { ascending: false });

      if (boundariesError) throw boundariesError;

      setDogs(dogsData || []);
      setBoundaries(boundariesData || []);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoadingData(false);
    }
  };

  const getDogBoundaries = (dogId: string) => {
    return boundaries.filter((boundary) => boundary.dog_id === dogId);
  };

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

  return (
    <Layout>
      <Head>
        <title>Boundary Settings - PetTrack</title>
      </Head>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="px-4 py-6 sm:px-0"
      >
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Boundary Settings
          </h1>
          <p className="text-gray-600 mt-2">Set up safe zones for your dogs</p>
        </motion.div>

        {loadingData ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent mx-auto mb-4"
            />
            <p className="text-gray-600">Loading boundaries...</p>
          </motion.div>
        ) : dogs.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center py-16 bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl p-12"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                duration: 0.5,
                delay: 0.3,
                type: "spring",
                stiffness: 200,
              }}
              className="text-8xl mb-6"
            >
              🐕
            </motion.div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              No dogs found
            </h3>
            <p className="text-gray-600 mb-8 text-lg">
              Add a dog first before setting up boundaries.
            </p>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/dogs/new"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 inline-block"
              >
                Add Your First Dog
              </Link>
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-8"
          >
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Select a Dog
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {dogs.map((dog) => (
                  <motion.button
                    key={dog.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedDog(dog.id)}
                    className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                      selectedDog === dog.id
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200 hover:border-blue-300"
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      {dog.photo_url ? (
                        <img
                          src={dog.photo_url}
                          alt={dog.name}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center">
                          <span className="text-xl">🐕</span>
                        </div>
                      )}
                      <div className="text-left">
                        <h3 className="font-semibold text-gray-900">
                          {dog.name}
                        </h3>
                        {dog.breed && (
                          <p className="text-sm text-gray-600">{dog.breed}</p>
                        )}
                      </div>
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>

            {selectedDog && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl shadow-xl p-6"
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Boundaries for {dogs.find((d) => d.id === selectedDog)?.name}
                </h2>

                <div className="space-y-4">
                  {getDogBoundaries(selectedDog).length === 0 ? (
                    <div className="text-center py-8">
                      <div className="text-4xl mb-4">🎯</div>
                      <p className="text-gray-600 mb-4">
                        No boundaries set for this dog yet.
                      </p>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                      >
                        Add Boundary
                      </motion.button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {getDogBoundaries(selectedDog).map((boundary) => (
                        <div
                          key={boundary.id}
                          className="border border-gray-200 rounded-xl p-4"
                        >
                          <div className="flex justify-between items-center">
                            <div>
                              <h3 className="font-semibold text-gray-900">
                                Boundary #{boundary.id.slice(-8)}
                              </h3>
                              <p className="text-sm text-gray-600">
                                Boundary ID: {boundary.id.slice(-8)}
                              </p>
                            </div>
                            <div className="flex space-x-2">
                              <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                              >
                                Edit
                              </motion.button>
                              <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                              >
                                Delete
                              </motion.button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </motion.div>
        )}
      </motion.div>
    </Layout>
  );
}
