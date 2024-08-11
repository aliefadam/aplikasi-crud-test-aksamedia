import React from "react";
import { Navigate } from "react-router-dom";
import Utils from "../utils/Utils";

function AuthMiddleware({ children }) {
  if (!Utils.auth()) {
    return <Navigate to="/login" />;
  }
  return children;
}

export default AuthMiddleware;
