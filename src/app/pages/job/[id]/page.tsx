"use client";
import React, { useState } from "react";
import DashboardHeader from "@/app/components/DashboardHeader";
import Footer from "@/app/components/Footer";
import JobCard from "@/app/components/JobCard";
import JobDetails from "@/app/components/JobDetails";
import SearchBar from "@/app/components/SearchForm";
import { RootState } from "@/app/redux/store";
import { useSelector } from "react-redux";

const JobDetailPage = () => {
  const [searchCriteria, setSearchCriteria] = useState({
    jobTitle: "",
    location: "",
    filter: "",
  });

  const handleSearch = (criteria: { jobTitle: string; location: string; filter: string }) => {
    setSearchCriteria(criteria);
  };
  const { jobSeekerData } = useSelector((state: RootState) => state.resume);
  const { generatedCoverLetter } = useSelector((state: RootState) => state.coverLetter);
  const [activeTab, setActiveTab] = useState("filter");
  const [viewCoverLetter, setViewCoverLetter] = useState(false);

  return (
    <>
      <DashboardHeader onTabChange={setActiveTab} activeTab={activeTab} />
      <main className={`min-h-screen w-full flex flex-col items-center bg-gray-100`}>
        <div className="w-full h-full mt-2">
          <SearchBar onSearch={handleSearch} />
          <JobDetails />
          <div className="max-w-7xl mx-auto p-4 ">
          <h2 className="text-2xl font-bold mb-4">Related jobs</h2>
          <JobCard searchCriteria={searchCriteria} />
          </div>
  
        </div>
      </main>
      <Footer />
    </>
  );
};

export default JobDetailPage;
