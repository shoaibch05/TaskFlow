import React from "react";
import { isTokenExpired } from "../utils/auth";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedLayout = () => {
  const token = localStorage.getItem("token");
  if (!token || isTokenExpired(token)) {
    return <Navigate to="/login" replace />;
  }
  return <Outlet />;
};

export default ProtectedLayout;
