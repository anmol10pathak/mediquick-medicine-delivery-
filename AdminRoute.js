import React from "react";
import { Navigate } from "react-router-dom";

const AdminRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user || !user.isAdmin) {
    // Not logged in or not admin → redirect to home/login
    return <Navigate to="/home" />;
  }

  return children;
};

export default AdminRoute;