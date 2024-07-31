"use client";

import React from "react";
import { useSelector } from "react-redux";
import Dashboard from "./Dashboard";
import { RootState } from "../redux/store";
import AuthComponent from "./AuthComponent";
import withAuth from "./withAuth";

const ClientHome: React.FC = () => {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  return <>{isAuthenticated ? <Dashboard /> : <AuthComponent />}</>;
};

export default withAuth(ClientHome);
