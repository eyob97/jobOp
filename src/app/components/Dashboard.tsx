"use client";

import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/app/redux/store";
import DashboardHeader from "@/app/components/DashboardHeader";
import LetterView from "@/app/components/Letters/LetterView";
import Documents from "@/app/components/Documents";
import { UploadCVCard } from "./JobSeeker/UploadCVDialog";
import withAuth from "./withAuth";
import EmployerDashboard from "@/app/components/Employer/EmployerDashboard";
import CoverLetterForm from "@/app/components/Letters/CoverLetterForm";
import MotivationLetterForm from "@/app/components/Letters/MotivationLetter";
import FilterDashboard from "@/app/components/JobSeeker/FilterDashboard";
import ApplicationsTable from "@/app/components/JobSeeker/ApplicationTable";
import JobPostForm from "./Employer/JobPostForm";
import { UploadJobCard } from "./Employer/UploadJob";
import DashboardFooter from "./DashboardFooter";
import Applications from "@/app/components/Employer/Applications";
import { getAuthDataFromLocalStorage } from "../utils/localstorage";

const Dashboard: React.FC = () => {
  // const user = useSelector((state: RootState) => state.auth?.user);
  const { user } = getAuthDataFromLocalStorage();
  const selectedJob = useSelector((state: RootState) => state.jobs.selectedJob);
  const [activeTab, setActiveTab] = useState("filter");
  const [viewLetter, setViewLetter] = useState(false);
  const [showLetterForm, setShowLetterForm] = useState(false);
  const [letterType, setLetterType] = useState<
    "Cover Letter" | "Motivation Letter"
  >("Cover Letter");

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setViewLetter(false);
    setShowLetterForm(false);
  };

  const handleGenerate = (type: "Cover Letter" | "Motivation Letter") => {
    setLetterType(type);
    setShowLetterForm(true);
  };

  const renderContent = () => {
    if (user?.user_type === "Employer") {
      switch (activeTab) {
        case "upload-job":
          return <UploadJobCard />;
        case "applicants":
          return <Applications />;
        default:
          return <EmployerDashboard />;
      }
    }

    if (viewLetter) {
      return (
        <LetterView
          letterType={letterType}
          onBack={() => setViewLetter(false)}
          jobId={selectedJob?.id || 0}
        />
      );
    }

    if (showLetterForm) {
      if (letterType === "Cover Letter") {
        return <CoverLetterForm onViewLetter={() => setViewLetter(true)} />;
      } else {
        return (
          <MotivationLetterForm onViewLetter={() => setViewLetter(true)} />
        );
      }
    }

    switch (activeTab) {
      case "filter":
        return <FilterDashboard />;
      case "upload":
        return <UploadCVCard />;
      case "documents":
        return (
          <Documents letterType={letterType} onGenerate={handleGenerate} />
        );
      case "applications":
        return <ApplicationsTable />;
      default:
        return null;
    }
  };

  return (
    <div key="uniqueKey">
      <DashboardHeader
        onTabChange={handleTabChange}
        activeTab={activeTab}
        userType={user?.user_type || "defaultUserType"}
      />
      <main
        className={`min-h-screen w-full flex flex-col items-center ${
          activeTab === "upload" || activeTab === "upload-job"
            ? "bg-green-700"
            : "bg-gray-100"
        }`}
      >
        <div className="w-full h-full">{renderContent()}</div>
      </main>
      {/* <DashboardFooter/> */}
    </div>
  );
};

export default withAuth(Dashboard);
