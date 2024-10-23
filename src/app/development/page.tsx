"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/app/redux/store";

const DevelopmentPage: React.FC = () => {
  const router = useRouter();
  const user = useSelector((state: RootState) => state.auth.user);

  const handleSignUpClick = () => {
    if (user) {
      router.push("/dashboard");
    } else {
      router.push("/auth/sign-up");
    }
  };

  return (
    <div className="bg-gradient-to-r from-emerald-700 to-teal-800 min-h-screen">
      <header className="bg-gradient-to-r from-emerald-800 to-teal-900 py-4 ">
        <div className="container mx-auto px-4 flex justify-between items-center w-100">
          <div>
            <Link href="/" className="flex items-center">
              <Image
                src="/landing_assets/vectors/group3_x2.svg"
                alt="Logo"
                width={40}
                height={40}
              />
            </Link>
          </div>

          <div className="flex items-center">
            <nav>
              <ul className="flex space-x-6 text-white mr-6">
                <li>
                  <Link href="/" className="text-white hover:text-yellow-400">
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    href="/companies"
                    className="text-white hover:text-yellow-400"
                  >
                    For Companies
                  </Link>
                </li>
                <li>
                  <Link
                    href="/jobseekers"
                    className="text-white hover:text-yellow-400"
                  >
                    For Jobseekers
                  </Link>
                </li>
              </ul>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <button className="border border-white text-white px-6 py-2 rounded-full hover:bg-white hover:text-emerald-800 transition duration-300 mr-4">
              Log In
            </button>
            <button
              onClick={handleSignUpClick}
              className="bg-yellow-400 text-black px-6 py-2 rounded-full font-bold hover:bg-yellow-300 transition duration-300"
            >
              Sign Up
            </button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-16 text-center relative z-10">
        <p
          className="text-white uppercase mb-4"
          style={{
            fontFamily: "Inter, sans-serif",
            fontSize: "14px",
            fontWeight: 600,
            lineHeight: "16.94px",
            letterSpacing: "0.01em",
          }}
        >
          AI-POWERED JOB SEARCH AND HIRING
        </p>
        <h1
          className="text-white text-5xl font-extrabold mb-6 leading-tight"
          style={{
            fontFamily: "Poppins, sans-serif",
            fontSize: "48px",
            lineHeight: "72px",
          }}
        >
          Empowering South Africa's Workforce
          <br />
          with WhatsApp Job Matching
        </h1>
        <p
          className="text-white mb-8"
          style={{
            fontFamily: "Inter, sans-serif",
            fontSize: "20px",
            fontWeight: 400,
            lineHeight: "24.2px",
          }}
        >
          We're transforming South Africa's job market,
          <br />
          making job matching easier than ever.
        </p>
        <div className="flex justify-center space-x-4 mb-16">
          <button className="bg-yellow-400 text-black px-8 py-3 rounded-full font-bold hover:bg-yellow-300 transition duration-300">
            Hire People
          </button>
          <button className="bg-white text-black px-8 py-3 rounded-full font-bold hover:bg-gray-100 transition duration-300">
            Find a Job
          </button>
        </div>
      </main>
    </div>
  );
};

export default DevelopmentPage;
