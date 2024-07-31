"use client"
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
    const { user, isLoading } = useSelector((state: RootState) => {
      console.log('Redux State:', state); 
      return state.auth;
    });

    useEffect(() => {
      console.log('Auth Status:', { user, isLoading }); 
      if (!isLoading && !user && !options?.allowUnauthenticatedAccess) {
        router.replace("/auth/sign-in");
      }
    }, [user, isLoading, router]);

    if (isLoading) {
      return <div>Loading...</div>;
    }

    return <WrappedComponent {...props} />;
  };

  return Wrapper;
};

export default withAuth;
