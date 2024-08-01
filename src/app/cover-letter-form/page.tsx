"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";

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
          <CoverLetterView onBack={() => setViewCoverLetter(false)} />
      ) : (
          <CoverLetterForm onViewCoverLetter={() => setViewCoverLetter(true)} />
      )}
    </div>
  );
};

export default GenerateCoverLetterPage;
