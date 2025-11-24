/* eslint-disable react/no-unescaped-entities */
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import { motion } from "framer-motion";
import { useAuth } from "@/lib/auth-context";
import Layout from "@/components/Layout";
import { supabase } from "@/lib/supabase";
import type { Database } from "@/supabase/types";

type Notification = Database["public"]["Tables"]["notifications"]["Row"] & {
  dog_name?: string;
};

export default function Notifications() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loadingData, setLoadingData] = useState(true);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/auth/login");
      return;
    }

    if (user) {
      fetchNotifications();
    }
  }, [user, loading, router]);

  const fetchNotifications = async () => {
    try {
      // Get notifications with dog names
      const { data: notificationsData, error: notificationsError } =
        await supabase
          .from("notifications")
          .select("*")
          .order("triggered_at", { ascending: false });

      if (notificationsError) throw notificationsError;

      // Get dog names for each notification
      const notificationsWithDogs = await Promise.all(
        (notificationsData || []).map(async (notification) => {
          const { data: dogData } = await supabase
            .from("dogs")
            .select("name")
            .eq("id", notification.dog_id)
            .single();

          return {
            ...notification,
            dog_name: dogData?.name || "Unknown Dog",
          };
        })
      );

      setNotifications(notificationsWithDogs);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    } finally {
      setLoadingData(false);
    }
  };

  const markAsSeen = async (notificationId: string) => {
    try {
      const { error } = await supabase
        .from("notifications")
        .update({ seen: true })
        .eq("id", notificationId);

      if (error) throw error;

      // Update local state
      setNotifications((prev) =>
        prev.map((notification) =>
          notification.id === notificationId
            ? { ...notification, seen: true }
            : notification
        )
      );
    } catch (error) {
      console.error("Error marking notification as seen:", error);
    }
  };

  const markAllAsSeen = async () => {
    try {
      const { error } = await supabase
        .from("notifications")
        .update({ seen: true })
        .eq("seen", false);

      if (error) throw error;

      // Update local state
      setNotifications((prev) =>
        prev.map((notification) => ({ ...notification, seen: true }))
      );
    } catch (error) {
      console.error("Error marking all notifications as seen:", error);
    }
  };

  const deleteNotification = async (notificationId: string) => {
    try {
      const { error } = await supabase
        .from("notifications")
        .delete()
        .eq("id", notificationId);

      if (error) throw error;

      // Update local state
      setNotifications((prev) =>
        prev.filter((notification) => notification.id !== notificationId)
      );
    } catch (error) {
      console.error("Error deleting notification:", error);
    }
  };

  const unseenCount = notifications.filter((n) => !n.seen).length;

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
        <title>Notifications - PetTrack</title>
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
              Notifications
            </h1>
            <p className="text-gray-600 mt-2">
              Stay updated on your dog's activities
              {unseenCount > 0 && (
                <span className="ml-2 bg-red-500 text-white text-sm px-2 py-1 rounded-full">
                  {unseenCount} new
                </span>
              )}
            </p>
          </div>

          {unseenCount > 0 && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={markAllAsSeen}
              className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Mark All as Read
            </motion.button>
          )}
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
            <p className="text-gray-600">Loading notifications...</p>
          </motion.div>
        ) : notifications.length === 0 ? (
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
              🔔
            </motion.div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              No notifications yet
            </h3>
            <p className="text-gray-600 mb-8 text-lg">
              You'll receive notifications when your dogs leave their designated
              boundaries.
            </p>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-4"
          >
            {notifications.map((notification, index) => (
              <motion.div
                key={notification.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border-l-4 ${
                  notification.seen
                    ? "border-gray-300 bg-gray-50/50"
                    : "border-blue-500 bg-blue-50/30"
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-2xl">
                        {notification.seen ? "📬" : "🔔"}
                      </span>
                      <div>
                        <h3 className="font-semibold text-gray-900">
                          {notification.dog_name}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {new Date(notification.triggered_at).toLocaleString()}
                        </p>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-4">{notification.message}</p>
                  </div>

                  <div className="flex gap-2 ml-4">
                    {!notification.seen && (
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => markAsSeen(notification.id)}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                      >
                        Mark Read
                      </motion.button>
                    )}
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => deleteNotification(notification.id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                    >
                      Delete
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </motion.div>
    </Layout>
  );
}
