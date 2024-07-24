"use client";

import FilterDashboard from "@/app/components/FilterDashboard";
import Footer from "@/app/components/Footer";
import { UploadCVCard } from "@/app/components/UploadCVDialog";
import { useSelector } from "react-redux";
import { RootState } from "@/app/redux/store";
import DashboardHeader from "@/app/components/DashboardHeader";

const ConvertCV = () => {
  const { jobSeekerData } = useSelector((state: RootState) => state.resume);

  return (
    <>
      <DashboardHeader/>
      <main className={`min-h-screen w-full flex flex-col items-center ${jobSeekerData ? "bg-gray-100" : "bg-gradient-to-r from-green-800 to-green-600"}`}>
        <div className="w-full h-full">
          {jobSeekerData ? <FilterDashboard /> : <UploadCVCard />}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default ConvertCV;
