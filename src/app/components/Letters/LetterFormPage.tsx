"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useRouter, useSearchParams } from "next/navigation";

const GenerateLetterPage = dynamic(() => import("./GenerateLetterPage"), {
  ssr: false,
  loading: () => <div>Loading...</div>,
});

const LetterFormPage: React.FC = () => {
  const searchParams = useSearchParams();
  const page = searchParams.get('page');
  const [letterType, setLetterType] = useState<'coverLetter' | 'motivationLetter'>('coverLetter');

  useEffect(() => {
    if (page === 'coverLetter' || page === 'motivationLetter') {
      setLetterType(page as 'coverLetter' | 'motivationLetter');
    }
  }, [page]);

  return <GenerateLetterPage letterType={letterType} />;
};

export default LetterFormPage;
