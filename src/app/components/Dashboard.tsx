"use client";

import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/app/redux/store";
import DashboardHeader from "@/app/components/DashboardHeader";
import Footer from "@/app/components/Footer";
import FilterDashboard from "@/app/components/FilterDashboard";
import { UploadCVCard } from "./UploadCVDialog";
import withAuth from "./withAuth";
import CoverLetterForm from "./CoverLetterForm";
import CoverLetterView from "./CoverLetterView";
import Documents from "./Documents";

const isEmpty = (data: any) => {
  return data == null || (Array.isArray(data) && data.length === 0);
};

const Dashboard = () => {
  const { jobSeekerData } = useSelector((state: RootState) => state.resume);
  const { generatedCoverLetter } = useSelector((state: RootState) => state.coverLetter);
  const [activeTab, setActiveTab] = useState("filter");
  const [viewCoverLetter, setViewCoverLetter] = useState(false);
  const [showCoverLetterForm, setShowCoverLetterForm] = useState(false);

  console.log("Dashboard: jobSeekerData =", jobSeekerData); 

  const renderContent = () => {
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

  const getBackgroundClass = () => {
    if (activeTab === "filter") {
      return "bg-gray-100";
    }
  };

  return (
    <>
      <DashboardHeader onTabChange={setActiveTab} activeTab={activeTab} />
      <main className={`min-h-screen w-full flex flex-col items-center ${getBackgroundClass()}`}>
        <div className="w-full h-full">
          {renderContent()}
        </div>
      </main>
      {/* <Footer /> */}
    </>
  );
};

export default withAuth(Dashboard);
