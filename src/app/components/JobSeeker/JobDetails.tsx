"use client";

import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaLinkedin,
  FaFacebook,
  FaTwitter,
  FaCopy,
  FaArrowRight,
} from "react-icons/fa";
import { Button } from "flowbite-react";
import { MapTrifold, CalendarBlank, Timer } from "phosphor-react";
import CustomButton from "../CustomButton";
import ApplyModal from "./ApplyJobModal";
import { RootState } from "../../redux/store";
import { setSelectedJob } from "../../redux/jobSlice";

const JobDetails: React.FC = () => {
  const dispatch = useDispatch();
  const job = useSelector((state: RootState) => state.jobs.selectedJob);
  const [showModal, setShowModal] = useState(false);

  if (!job) {
    return <div className="mt-4 flex flex-col items-center">No job selected</div>;
  }

  const handleOpenModal = () => {
    setShowModal(true);
    dispatch(setSelectedJob(job.id)); 
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleGenerate = (letterType: 'coverLetter' | 'motivationLetter') => {
    // Navigate to the appropriate letter generation page
    // For example:
    // router.push(`/generate/${letterType}`);
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-12 mt-4">
      <h2 className="text-3xl font-bold mb-4">Job Details</h2>
      <div className="grid grid-cols-1 md:grid-cols-7 gap-8">
        {/* Main Job Description */}
        <div className="col-span-4">
          <div className="flex items-center mb-4">
            <img
              src={job.companyLogo}
              alt={job.company}
              className="w-16 h-16 rounded-full mr-4"
            />
            <div>
              <h3 className="text-xl font-normal">{job.title}</h3>
              <div className="flex justify-between items-center mb-2">
                <p className="text-gray-600">
                  @ {job.company}{" "}
                  <span
                    className={`px-2 py-1 rounded ${
                      job.type === "Part-time"
                        ? "bg-blue-200 text-blue-800"
                        : "bg-green-200 text-green-800"
                    }`}
                  >
                    {job.type}
                  </span>
                </p>
              </div>
            </div>
          </div>
          <p className="text-lg font-semibold mb-4">Job Description</p>
          <p className="text-lg font-normal mb-4">{job.description}</p>
          <p className="text-lg font-semibold mb-4">Requirements</p>
          <p className="text-lg font-normal mb-4">{job.description}</p>
          <p className="text-lg font-semibold mb-4">Desirable:</p>
          <p className="text-lg font-normal mb-4">{job.description}</p>
          <p className="text-lg font-semibold mb-4">Benefits</p>
          <p className="text-lg font-normal mb-4">{job.description}</p>
        </div>

        {/* Additional Job Info */}
        <div className="col-span-3 space-y-4">
          <div className="flex justify-end">
            <CustomButton onClick={handleOpenModal}>
              Apply now <FaArrowRight className="mt-1 m-1" />
            </CustomButton>
          </div>
          <div className="p-4 bg-white shadow-md rounded-lg flex flex-col items-center">
            <h3 className="text-lg font-semibold mb-2">Salary </h3>
            <p className="text-green-600 text-2xl font-normal">{job.salary}</p>
            <p className="text-gray-600">Yearly salary</p>
            <div className="w-full border-t border-gray-200 my-4"></div>{" "}
            {/* Divider */}
            <div className="mt-4 flex flex-col items-center">
              <MapTrifold size={32} color="green" />
              <div className="text-center">
                <h3 className="text-lg font-semibold mb-2">Job Location</h3>
                <p className="text-gray-600">{job.location}</p>
              </div>
            </div>
          </div>

          <div className="p-4 bg-white shadow-md rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Job Overview</h3>
            <div className="flex justify-between">
              <div className="mr-4">
                <div className="flex items-center text-gray-600 mb-2">
                  <CalendarBlank size={32} className="mr-2" color="green" />
                </div>
                <p className="text-gray-600 mb-1">JOB POSTED:</p>
                <p className="font-bold">
                  {new Date(job.postedDate).toLocaleDateString()}
                </p>
              </div>
              <div className="items-start">
                <div className="flex items-center text-gray-600 mb-2">
                  <Timer size={32} className="mr-2" color="green" />
                </div>
                <p className="text-gray-600 mb-1">JOB EXPIRE IN:</p>
                <p className="font-bold">
                  {new Date(job.expiryDate).toLocaleDateString()}
                </p>
              </div>
            </div>
            <div className="w-full border-t border-gray-200 my-4"></div>{" "}
            {/* Divider */}
            <h3 className="text-lg font-semibold mb-2">Share this job:</h3>
            <div className="flex space-x-2">
              <Button className="bg-gray-200 text-gray-700 rounded-full">
                <FaCopy className="mr-1" /> Copy link
              </Button>
              <Button className="bg-green-700 rounded-full text-white">
                <FaLinkedin className="mr-1" size={24} />
              </Button>
              <Button className="bg-green-700 rounded-full text-white">
                <FaFacebook className="mr-1" size={24} />
              </Button>
              <Button className="bg-green-700 rounded-full text-white">
                <span className="text-xl">X</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
      <ApplyModal
        show={showModal}
        onClose={handleCloseModal}
        jobId={job.id}
        onGenerate={handleGenerate}
      />
    </div>
  );
};

export default JobDetails;
