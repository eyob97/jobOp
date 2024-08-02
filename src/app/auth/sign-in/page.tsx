"use client";

import React from "react";
import dynamic from "next/dynamic";
import { Suspense } from "react";

const SignIn = dynamic(() => import('@/app/components/SignIn'), {
  ssr: false,
  loading: () => <div>Loading...</div>,
});

const SignInPage: React.FC = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SignIn />
    </Suspense>
  );
};

export default SignInPage;
