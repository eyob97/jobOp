import React from "react";
import dynamic from "next/dynamic";

const LetterFormPage = dynamic(() => import("@/app/components/Letters/LetterFormPage"), {
  ssr: false,
  loading: () => <div>Loading...</div>,
});

const Page: React.FC = () => {
  return <LetterFormPage />;
};

export default Page;
