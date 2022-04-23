import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { IProtectedRoute } from "../../types/types";

const ProtectedRoute: React.FC<IProtectedRoute> = ({
  isProtected,
  redirectPath,
  component,
}) => {
  if (isProtected === false) {
    return <Navigate to={redirectPath} replace />;
  }
  return component ? component : <Outlet />;
};

export default ProtectedRoute;
