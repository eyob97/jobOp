"use client";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import CustomButton from "@/app/components/CustomButton";
import { FaArrowRight } from "react-icons/fa";
import { CalendarBlank, MapTrifold } from "phosphor-react";
import { fetchEmployerJobs } from "@/app/redux/jobSlice";
import DashboardHeader from "@/app/components/DashboardHeader";
import { useParams } from "next/navigation";
import { Button, Card } from "flowbite-react";
import { format } from "date-fns";

const page = () => {
  const { jobId } = useParams<{ jobId: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState<any>(null);
  const [activeTab, setActiveTab] = useState("filter");
  const user = useSelector((state: RootState) => state.auth?.user);

  useEffect(() => {
    const fetchJobs = async () => {
      const jobs: any = await dispatch(fetchEmployerJobs());
      setJobs(jobs.payload.data);

      const job = jobs.payload.data.find((job: any) => job.id === jobId);
      console.log("job", job);
      setSelectedJob(job);
    };
    fetchJobs();
  }, [dispatch, jobId]);

  if (!selectedJob) {
    return <p>Loading...</p>;
  }
  return (
    <>
      <DashboardHeader
        onTabChange={setActiveTab}
        activeTab={activeTab}
        userType={user?.user_type || "employer"}
      />

      <>
        <DashboardHeader
          onTabChange={setActiveTab}
          activeTab={activeTab}
          userType={user?.user_type || "employer"}
        />

        <div className="bg-gray-50 min-h-screen p-6">
          <div className="max-w-7xl mx-auto">
            {/* Job Header */}
            <div className="bg-white shadow-md rounded-lg p-4 mb-6">
              <div className="flex items-center">
                <img
                  src="company-logo.png"
                  alt="Company Logo"
                  className="h-16 w-16 rounded-full mr-4"
                />
                <div>
                  <h2 className="text-2xl font-bold">
                    {selectedJob?.job_title || "Loading..."}
                  </h2>
                  <p className="text-gray-600">
                    {selectedJob?.company?.name || "Company Name"} -{" "}
                    {selectedJob?.work_type}
                  </p>
                </div>
              </div>
            </div>

            {/* Job Description & Details */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Left Column */}
              <div className="col-span-2">
                <Card className="mb-6">
                  <h3 className="text-xl font-semibold mb-4">
                    Job Description
                  </h3>
                  <p>
                    {selectedJob?.description || "No description available."}
                  </p>
                </Card>

                <Card className="mb-6">
                  <h3 className="text-xl font-semibold mb-4">
                    Responsibilities
                  </h3>
                  <p>
                    {selectedJob?.responsibilities ||
                      "No responsibilities listed."}
                  </p>
                </Card>

                <Card className="mb-6">
                  <h3 className="text-xl font-semibold mb-4">
                    Desirable Skills
                  </h3>
                  <p>
                    {selectedJob?.desirable_skills ||
                      "No desirable skills listed."}
                  </p>
                </Card>

                <Card>
                  <h3 className="text-xl font-semibold mb-4">Benefits</h3>
                  <ul className="list-disc pl-6">
                    {selectedJob?.benefits?.map(
                      (benefit: string, index: number) => (
                        <li key={index}>{benefit}</li>
                      )
                    )}
                  </ul>
                </Card>
              </div>

              {/* Right Column */}
              <div>
                <Card className="mb-6">
                  <h3 className="text-xl font-semibold mb-4">Job Overview</h3>
                  <p>
                    <strong>Posted:</strong>{" "}
                    {format(new Date(selectedJob?.created_date), "PPP")}
                  </p>
                  <p>
                    <strong>Expires:</strong>{" "}
                    {format(new Date(selectedJob?.expiry_date), "PPP")}
                  </p>
                  <p>
                    <strong>Location:</strong>{" "}
                    {selectedJob?.location || "Not specified"}
                  </p>
                  <p>
                    <strong>Salary:</strong>{" "}
                    {selectedJob?.fixed_salary
                      ? `$${selectedJob.fixed_salary}`
                      : `$${selectedJob?.min_salary} - $${selectedJob?.max_salary}`}
                  </p>
                  <p>
                    <strong>Employment Type:</strong>{" "}
                    {selectedJob?.employment_type || "Not specified"}
                  </p>
                </Card>

                <Card>
                  <h3 className="text-xl font-semibold mb-4">Applicants</h3>
                  <ul>
                    {selectedJob?.applicants?.map(
                      (applicant: any, index: number) => (
                        <li key={index} className="mb-2">
                          {applicant.seeker?.full_name || "Unnamed Applicant"}
                          <div className="mt-1">
                            <a
                              href={applicant.resume?.file}
                              target="_blank"
                              className="text-blue-600"
                            >
                              View Resume
                            </a>
                          </div>
                        </li>
                      )
                    )}
                  </ul>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </>
    </>
  );
};

export default page;
