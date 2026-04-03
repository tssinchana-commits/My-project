import React from "react";
import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

function ProtectedRoute({ children, allowedRoles }) {

  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/" />;
  }

  try {

    const decoded = jwtDecode(token);
    const userRole = decoded.roles[0];

    if (allowedRoles && !allowedRoles.includes(userRole)) {
      return <h3 style={{textAlign:"center"}}>Access Denied</h3>;
    }

    return children;

  } catch (error) {
    return <Navigate to="/" />;
  }
}

export default ProtectedRoute;