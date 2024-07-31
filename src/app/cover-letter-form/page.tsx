"use client";

import React, { useState, Suspense } from "react";
import dynamic from "next/dynamic";

// Dynamically import the components
const CoverLetterView = dynamic(() => import("../components/CoverLetterView"), {
  ssr: false,
  loading: () => <p>Loading...</p>,
});

const CoverLetterForm = dynamic(() => import("../components/CoverLetterForm"), {
  ssr: false,
  loading: () => <p>Loading...</p>,
});

const GenerateCoverLetterPage: React.FC = () => {
  const [viewCoverLetter, setViewCoverLetter] = useState(false);

  return (
    <div>
      {viewCoverLetter ? (
        <Suspense fallback={<div>Loading...</div>}>
          <CoverLetterView onBack={() => setViewCoverLetter(false)} />
        </Suspense>
      ) : (
        <Suspense fallback={<div>Loading...</div>}>
          <CoverLetterForm onViewCoverLetter={() => setViewCoverLetter(true)} />
        </Suspense>
      )}
    </div>
  );
};

export default GenerateCoverLetterPage;
