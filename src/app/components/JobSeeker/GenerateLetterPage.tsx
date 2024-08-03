"use client"
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { useSelector } from "react-redux";
import { RootState } from "@/app/redux/store";

const LetterView = dynamic(() => import("@/app/components/Letters/LetterView"), {
  ssr: false,
  loading: () => <p>Loading...</p>,
});

const CoverLetterForm = dynamic(() => import("@/app/components/Letters/CoverLetterForm"), {
  ssr: false,
  loading: () => <p>Loading...</p>,
});

const MotivationLetterForm = dynamic(() => import("@/app/components/Letters/MotivationLetter"), {
  ssr: false,
  loading: () => <p>Loading...</p>,
});

const GenerateLetterPage: React.FC<{ letterType: 'Cover Letter' | 'Motivation Letter' }> = ({ letterType }) => {
  const [viewLetter, setViewLetter] = useState(false);
  const router = useRouter();
  const selectedJob = useSelector((state: RootState) => state.jobs.selectedJob);

  const onBack = () => {
    setViewLetter(false);
    router.push("/dashboard");
  };

  const handleGenerate = (type: 'Cover Letter' | 'motivationLetter') => {
    setViewLetter(false);
    router.push(`/letter-form?page=${type}`);
  };

  return (
    <div>
      {viewLetter ? (
        <LetterView letterType={letterType} onBack={onBack} jobId={selectedJob?.id || 0} />
      ) : (
        letterType === 'Cover Letter' ? (
          <CoverLetterForm onViewLetter={() => setViewLetter(true)} />
        ) : (
          <MotivationLetterForm onViewLetter={() => setViewLetter(true)} />
        )
      )}
    </div>
  );
};

export default GenerateLetterPage;