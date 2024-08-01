"use client";

import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/app/redux/store";
import DashboardHeader from "@/app/components/DashboardHeader";
import FilterDashboard from "@/app/components/FilterDashboard";
import CoverLetterForm from "@/app/components/CoverLetterForm";
import CoverLetterView from "@/app/components/CoverLetterView";
import Documents from "@/app/components/Documents";
import { UploadCVCard } from "./UploadCVDialog";
import withAuth from "./withAuth";
import EmployerDashboard from "@/app/components/Employer/EmployerDashboard"; 

const Dashboard: React.FC = () => {
  const { jobSeekerData } = useSelector((state: RootState) => state.resume);
  const { generatedCoverLetter } = useSelector((state: RootState) => state.coverLetter);
  const user = useSelector((state: RootState) => state.auth?.user);
  const [activeTab, setActiveTab] = useState("filter");
  const [viewCoverLetter, setViewCoverLetter] = useState(false);
  const [showCoverLetterForm, setShowCoverLetterForm] = useState(false);

  const renderContent = () => {
    if (user?.user_type === 'Employer') {
      return <EmployerDashboard />;
    }

    if (viewCoverLetter) {
      return <CoverLetterView onBack={() => setViewCoverLetter(false)} />;
    }
    if (showCoverLetterForm) {
      return <CoverLetterForm onViewCoverLetter={() => setViewCoverLetter(true)} />;
    }
    switch (activeTab) {
      case "filter":
        return <FilterDashboard />;
      case "upload":
        return <UploadCVCard />;
      case "documents":
        return <Documents onGenerate={() => setShowCoverLetterForm(true)} />;
      case "applications":
        return <div>Applications Content</div>;
      default:
        return null;
    }
  };

  return (
    <>
      <DashboardHeader onTabChange={setActiveTab} activeTab={activeTab} userType={user?.user_type || 'defaultUserType'} />
      <main className={`min-h-screen w-full flex flex-col items-center ${activeTab === "filter" ? "bg-gray-100" : ""}`}>
        <div className="w-full h-full">
          {renderContent()}
        </div>
      </main>
    </>
  );
};

export default withAuth(Dashboard);
