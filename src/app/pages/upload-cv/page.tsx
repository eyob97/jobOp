"use client";

import DashboardHeader from "@/app/components/DashboardHeader";
import Footer from "@/app/components/Footer";
import { UploadCVCard } from "@/app/components/UploadCVDialog";
import { useRouter } from "next/navigation";

const ConvertCV = () => {
  return (
    <>
      <DashboardHeader />
      <main className="min-h-screen flex flex-col items-center justify-center py-20 bg-gradient-to-r from-green-800 to-green-600">
        <UploadCVCard />
      </main>
      <Footer />
    </>
  );
};

export default ConvertCV;
