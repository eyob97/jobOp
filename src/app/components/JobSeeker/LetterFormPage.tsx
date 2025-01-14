"use client"
import React, { useEffect, useState, Suspense } from "react";
import dynamic from "next/dynamic";
import { useRouter, useSearchParams } from "next/navigation";

const GenerateLetterPage = dynamic(() => import("@/app/components/JobSeeker/GenerateLetterPage"), {
  ssr: false,
  loading: () => <div>Loading...</div>,
});

const LetterFormPage: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const page = searchParams.get('page');
  const [letterType, setLetterType] = useState<'Cover Letter' | 'Motivation Letter'>('Cover Letter');



  return (
    <Suspense fallback={<div>Loading...</div>}>
      <GenerateLetterPage letterType={letterType} />
    </Suspense>
  );
};

export default LetterFormPage;