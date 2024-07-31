"use client";

import React, { useState } from "react";
import CoverLetterView from "../components/CoverLetterView";
import CoverLetterForm from "../components/CoverLetterForm";

const GenerateCoverLetterPage = () => {
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
