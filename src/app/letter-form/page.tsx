import React, { Suspense } from "react";
import dynamic from "next/dynamic";

const LetterFormPage = dynamic(() => import("@/app/components/JobSeeker/LetterFormPage"), {
  ssr: false, 
  loading: () => <div>Loading...</div>, 
});

const Page: React.FC = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LetterFormPage />
    </Suspense>
  );
};

export default Page;