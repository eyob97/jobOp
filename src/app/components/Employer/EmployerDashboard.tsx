"use client";

import React, { useEffect, useState } from "react";
import { Button, Card, Spinner, Alert } from "flowbite-react";
import { HiDownload, HiPlus } from "react-icons/hi";
import { AppDispatch, RootState } from "@/app/redux/store";
import { fetchEmployerJobs } from "@/app/redux/jobSlice";
import { useDispatch } from "react-redux";
import { FaMapMarkerAlt } from "react-icons/fa";
import { format } from "date-fns";

const EmployerDashboard: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [jobs, setJobs] = useState([]);

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
              >
                <HiDownload className="mt-1 mr-1" />
                Upload PDF
              </Button>
              <Button
                type="button"
                className="rounded-full text-black flex items-center"
                style={{ backgroundColor: "#FFC424", color: "#000" }}
              >
                <HiPlus className="mt-1 mr-1" />
                Create Job Post
              </Button>
            </div>
          </div>
        </div>
        <div className="p-6 bg-white rounded-lg shadow-md">
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {jobs.length > 0 ? (
                jobs.map((job: any) => (
                  <Card key={job.id} className="max-w-sm cursor-pointer">
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
                      <div className="text-gray-600">Status: {job.status}</div>
                    </div>
                    <p className="text-sm text-gray-600 mb-4">
                      {typeof job.description === "string"
                        ? job.description
                        : "No description available"}
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
                ))
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
