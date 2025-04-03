
import React, { useEffect, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import Header from "@/components/layouts/Header";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

const AppLayout = () => {
  const { user, loading } = useAuth();
  const location = useLocation();
  const [isReady, setIsReady] = useState(false);
  
  useEffect(() => {
    console.log("AppLayout: Current pathname:", location.pathname);
    console.log("AppLayout: Auth state:", { user: !!user, loading });
    
    // Only set ready after auth state is determined
    if (!loading) {
      const timeoutId = setTimeout(() => {
        setIsReady(true);
      }, 50);
      
      return () => clearTimeout(timeoutId);
    }
  }, [location.pathname, user, loading]);

  if (loading || !isReady) {
    console.log("AppLayout: Showing loading state");
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-green-50 to-white">
        <Loader2 className="h-8 w-8 text-green-600 animate-spin" />
      </div>
    );
  }

  if (!user) {
    console.log("AppLayout: No user, redirecting to login");
    return <Navigate to="/login" replace />;
  }

  console.log("AppLayout: Rendering main layout");
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-1">
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15, ease: "easeInOut" }}
          className="container mx-auto py-6 px-4"
        >
          <Outlet />
        </motion.div>
      </main>
    </div>
  );
};

export default AppLayout;
