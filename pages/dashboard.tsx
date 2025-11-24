import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useAuth } from "@/lib/auth-context";
import Layout from "@/components/Layout";
import { supabase } from "@/lib/supabase";
import type { Database } from "@/supabase/types";

type Dog = Database["public"]["Tables"]["dogs"]["Row"];

export default function Dashboard() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [dogs, setDogs] = useState<Dog[]>([]);
  const [loadingDogs, setLoadingDogs] = useState(true);

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
      const { data, error } = await supabase
        .from("dogs")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setDogs(data || []);
    } catch (error) {
      console.error("Error fetching dogs:", error);
    } finally {
      setLoadingDogs(false);
    }
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
        <title>Dashboard - Dog Boundary Tracker</title>
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
          className="flex justify-between items-center mb-8"
        >
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Your Dogs
            </h1>
            <p className="text-gray-600 mt-2">
              Manage and track your furry friends
            </p>
          </div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              href="/dogs/new"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2"
            >
              <span>+</span>
              Add New Dog
            </Link>
          </motion.div>
        </motion.div>

        {loadingDogs ? (
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
            <p className="text-gray-600">Loading your dogs...</p>
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
              No dogs yet
            </h3>
            <p className="text-gray-600 mb-8 text-lg">
              Get started by adding your first dog to begin tracking their
              adventures.
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
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {dogs.map((dog, index) => (
              <motion.div
                key={dog.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="bg-white overflow-hidden shadow-xl rounded-2xl hover:shadow-2xl transition-all duration-300 group"
              >
                {dog.photo_url ? (
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="relative overflow-hidden"
                  >
                    <Image
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                      src={dog.photo_url}
                      alt={dog.name}
                      width={400}
                      height={192}
                      unoptimized
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </motion.div>
                ) : (
                  <div className="w-full h-48 bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                    <span className="text-6xl">🐕</span>
                  </div>
                )}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {dog.name}
                  </h3>
                  {dog.breed && (
                    <p className="text-sm text-gray-600 mb-2 flex items-center gap-2">
                      <span className="text-blue-500">🏷️</span>
                      {dog.breed}
                    </p>
                  )}
                  {dog.collar_id && (
                    <p className="text-sm text-gray-600 mb-4 flex items-center gap-2">
                      <span className="text-purple-500">📡</span>
                      Collar ID: {dog.collar_id}
                    </p>
                  )}
                  <motion.div
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    <Link
                      href={`/dogs/${dog.id}`}
                      className="text-blue-600 hover:text-purple-600 text-sm font-semibold flex items-center gap-2 group"
                    >
                      View Details
                      <motion.span
                        initial={{ x: 0 }}
                        whileHover={{ x: 3 }}
                        transition={{ type: "spring", stiffness: 400 }}
                      >
                        →
                      </motion.span>
                    </Link>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </motion.div>
    </Layout>
  );
}
