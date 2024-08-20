"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/app/redux/store";

interface WithAuthOptions {
  allowUnauthenticatedAccess?: boolean;
}

const withAuth = (
  WrappedComponent: React.ComponentType,
  options?: WithAuthOptions
) => {
  const Wrapper = (props: any) => {
    const router = useRouter();
    const authState = useSelector((state: RootState) => state.auth);
    const { user, isLoading } = authState;

    useEffect(() => {
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
