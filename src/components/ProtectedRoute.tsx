// src/components/ProtectedRoute.tsx
import { useAuth } from "@/context/authContext";
import React from "react";
import { Navigate, Outlet } from "react-router-dom";


const ProtectedRoute: React.FC = () => {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>;

  return user ? <Outlet /> : <Navigate to="/auth" replace />;
};

export default ProtectedRoute;
