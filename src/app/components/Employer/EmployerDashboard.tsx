"use client";

import React, { useEffect, useState } from "react";
import { Button, Card, Spinner, Alert } from "flowbite-react";
import { HiDownload, HiPlus } from "react-icons/hi";
import { AppDispatch, RootState } from "@/app/redux/store";
import { fetchEmployerJobs, setSelectedJob } from "@/app/redux/jobSlice";
import { useDispatch } from "react-redux";
import { FaMapMarkerAlt } from "react-icons/fa";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import { UploadJobCard } from "./UploadJob";

const EmployerDashboard: React.FC = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const [activeTab, setActiveTab] = useState("filter");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [jobs, setJobs] = useState([]);
  const [expandedJobs, setExpandedJobs] = useState<{ [key: number]: boolean }>(
    {}
  );

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        const jobs: any = await dispatch(fetchEmployerJobs());
        setJobs(jobs.payload.data);
        setError(null);
      } catch (err) {
        setError("Failed to load jobs. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, [dispatch]);

  const handleNavigation = (tab: string, path: string) => {
    //changing tabs
    router.push(path);
  };

  const handleClick = (jobId: number) => {
    dispatch(setSelectedJob(jobId));
    router.push(`/job/${jobId}`);
  };

  const toggleDescription = (jobId: number) => {
    setExpandedJobs((prevState) => ({
      ...prevState,
      [jobId]: !prevState[jobId],
    }));
  };

  return (
    <>
      <div className="bg-[rgba(214,235,223,1)] min-h-screen">
        <div className="p-6">
          <div className="w-full flex justify-between items-center bg-white p-4 shadow-md mb-4">
            <h2 className="text-2xl font-bold mb-2">My job posts</h2>
            <div className="flex space-x-4">
              <Button
                type="button"
                className="rounded-full text-black flex items-center"
                style={{ backgroundColor: "#fff", color: "#000" }}
                onClick={() =>
                  handleNavigation("upload-job", "/dashboard#upload-job")
                }
              >
                <HiDownload className="mt-1 mr-1" />
                Upload PDF
              </Button>
              <Button
                type="button"
                className="rounded-full text-black flex items-center"
                style={{ backgroundColor: "#FFC424", color: "#000" }}
                onClick={() =>
                  handleNavigation("upload-job", "/dashboard#upload-job")
                }
              >
                <HiPlus className="mt-1 mr-1" />
                Create Job Post
              </Button>
            </div>
          </div>
        </div>
        <div
          style={{ border: "1px solid red" }}
          className="p-6 bg-white rounded-lg shadow-md w-100"
        >
          {loading && (
            <div className="flex justify-center">
              <Spinner size="lg" aria-label="Loading jobs" />
            </div>
          )}
          {error && (
            <div className="mb-4">
              <Alert color="failure">
                <span>{error}</span>
              </Alert>
            </div>
          )}
          {!loading && !error && (
            <div
              style={{ border: "1px solid red" }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mx-5"
            >
              {jobs.length > 0 ? (
                jobs.map((job: any) => {
                  const isExpanded = expandedJobs[job.id];
                  const description = isExpanded
                    ? job.description
                    : job.description?.slice(0, 100) +
                      (job.description?.length > 100 ? "..." : "");
                  return (
                    <Card
                      key={job.id}
                      className="max-w-sm cursor-pointer transition-transform transform hover:scale-105 hover:shadow-lg active:scale-95 active:shadow-md"
                      onClick={() => handleClick(job?.id)}
                    >
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="text-lg font-medium">{job.job_title}</h3>
                      </div>
                      <div className="flex justify-between items-center mb-2">
                        <span
                          className={`px-2 py-1 rounded ${
                            job.work_type === "Part-time"
                              ? "bg-blue-200 text-blue-800"
                              : "bg-green-200 text-green-800"
                          }`}
                        >
                          {job.work_type}
                        </span>
                        <div className="text-gray-600">
                          Status: {job.status}
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 mb-4">
                        {typeof job.description === "string"
                          ? description
                          : "No description available"}
                        {job.description?.length > 100 && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleDescription(job.id);
                            }}
                            className="text-blue-500 ml-2"
                          >
                            {isExpanded ? "See Less" : "See More"}
                          </button>
                        )}
                      </p>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <div>
                            <p className="text-sm font-medium">
                              {job.company?.name}
                            </p>
                            <p className="text-sm text-gray-600 flex items-center">
                              <FaMapMarkerAlt className="mr-1 text-green-600" />{" "}
                              {job.location}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="text-sm text-gray-600">
                        Posted: {format(new Date(job.created_date), "PPP")}
                      </div>
                    </Card>
                  );
                })
              ) : (
                <p className="text-center text-gray-600">
                  No job posts available.
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default EmployerDashboard;
