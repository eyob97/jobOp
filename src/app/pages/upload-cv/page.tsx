"use client";

import DashboardHeader from "@/app/components/DashboardHeader";
import FilterDashboard from "@/app/components/FilterDashboard";
import Footer from "@/app/components/Footer";
import { UploadCVCard } from "@/app/components/UploadCVDialog";

const ConvertCV = () => {
  return (
    <>
      <DashboardHeader />
      <main className="min-h-screen flex flex-col items-center py-20 bg-gradient-to-r from-green-800 to-green-600">
        <div className="flex flex-col items-center w-full">
          {/* <FilterDashboard /> */}
          <UploadCVCard />
        </div>
      </main>
      <Footer />
    </>
  );
};

export default ConvertCV;
