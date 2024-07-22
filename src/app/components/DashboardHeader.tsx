"use client";

import Link from "next/link";

const DashboardHeader: React.FC = () => {
  return (
    <header className="w-full bg-white shadow-md p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="logo">
          <a href="#home" style={{ display: "flex", alignItems: "center" }}>
            <img 
              src="/landing_assets/vectors/group3_x2.svg"
              alt="Logo"
              className="h-8 w-8" 
            />
          </a>
        </h1>
        <h1 className="text-lg font-bold">
          <Link href="/" legacyBehavior>
            <a className="text-green-800">Home</a>
          </Link>
        </h1>
      </div>
    </header>
  );
};

export default DashboardHeader;
