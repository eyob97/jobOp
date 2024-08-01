import React, { Suspense } from "react";
import CompleteSignUpContent from "@/app/components/CompleteSignUp";

const CompleteSignUp: React.FC = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CompleteSignUpContent />
    </Suspense>
  );
};

export default CompleteSignUp;
