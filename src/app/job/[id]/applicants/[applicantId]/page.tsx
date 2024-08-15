import dynamic from "next/dynamic";
import React from "react";

const ApplicantComponent = dynamic(
  () => import("../../../../components/Employer/ApplicantDetails"),
  {
    ssr: false,
  }
);

const Page = () => {
  return <ApplicantComponent />;
};

export default Page;
