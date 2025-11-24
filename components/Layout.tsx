import { useAuth } from "@/lib/auth-context";
import Link from "next/link";
import { useRouter } from "next/router";
import { motion } from "framer-motion";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const { user, signOut } = useAuth();
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut();
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white/80 backdrop-blur-md shadow-lg border-b border-gray-200"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href="/dashboard"
                  className="flex-shrink-0 flex items-center text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
                >
                  🐕 Dog Boundary Tracker
                </Link>
              </motion.div>
              <div className="hidden sm:ml-8 sm:flex sm:space-x-8">
                <motion.div whileHover={{ scale: 1.05 }}>
                  <Link
                    href="/dashboard"
                    className={`${
                      router.pathname === "/dashboard"
                        ? "border-blue-500 text-blue-600"
                        : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                    } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-all duration-200`}
                  >
                    Dashboard
                  </Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }}>
                  <Link
                    href="/settings/boundaries"
                    className={`${
                      router.pathname === "/settings/boundaries"
                        ? "border-blue-500 text-blue-600"
                        : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                    } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-all duration-200`}
                  >
                    Boundaries
                  </Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }}>
                  <Link
                    href="/notifications"
                    className={`${
                      router.pathname === "/notifications"
                        ? "border-blue-500 text-blue-600"
                        : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                    } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-all duration-200`}
                  >
                    Notifications
                  </Link>
                </motion.div>
              </div>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:items-center">
              <span className="text-sm text-gray-700 mr-4 bg-gray-100 px-3 py-1 rounded-full">
                {user?.email}
              </span>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSignOut}
                className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white px-4 py-2 rounded-lg font-medium shadow-md hover:shadow-lg transition-all duration-200"
              >
                Sign out
              </motion.button>
            </div>
          </div>
        </div>
      </motion.nav>

      <main className="max-w-7xl mx-auto py-8 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {children}
        </motion.div>
      </main>
    </div>
  );
}
