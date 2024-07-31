"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

interface WithAuthOptions {
  allowUnauthenticatedAccess?: boolean;
}

const withAuth = (
  WrappedComponent: React.ComponentType,
  options?: WithAuthOptions
) => {
  const Wrapper = (props: any) => {
    const router = useRouter();
    const { isAuthenticated, isLoading } = useSelector((state: RootState) => {
      console.log('Redux State:', state); 
      return state.auth;
    });

    useEffect(() => {
      console.log('Auth Status:', { isAuthenticated, isLoading }); 
      if (!isLoading && !isAuthenticated && !options?.allowUnauthenticatedAccess) {
        router.replace("/auth/sign-in");
      }
    }, [isAuthenticated, isLoading, router]);

    if (isLoading || (!isAuthenticated && !options?.allowUnauthenticatedAccess)) {
      return <div>Loading...</div>;
    }

    return <WrappedComponent {...props} />;
  };

  return Wrapper;
};

export default withAuth;
