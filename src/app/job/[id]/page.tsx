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
import { useParams, useRouter } from "next/navigation";
import { Button, Card } from "flowbite-react";
import { format } from "date-fns";
import { setSelectedJob } from "../../redux/jobSlice";

const page = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectJob] = useState<any>(null);
  const [activeTab, setActiveTab] = useState("filter");
  const user = useSelector((state: RootState) => state.auth?.user);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const jobs: any = await dispatch(fetchEmployerJobs());

        setJobs(jobs.payload.data);

        // Convert the id from useParams to a number
        const numericId = parseInt(id, 10);
        const job = jobs?.payload?.data?.find(
          (job: any) => job.id === numericId
        );

        setSelectJob(job);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };
    fetchJobs();
  }, [dispatch, id]);

  if (!selectedJob) {
    return <p>Loading...</p>;
  }

  const handleViewClick = (appId: number) => {
    const numericId = parseInt(id, 10);
    dispatch(setSelectedJob(numericId));
    router.push(`/job/${id}/applicant/${appId}`);
  };
  return (
    <>
      <DashboardHeader
        onTabChange={setActiveTab}
        activeTab={activeTab}
        userType={user?.user_type || "employer"}
      />

      <div className="bg-gray-50 min-h-screen p-6">
        <div className="max-w-7xl mx-auto">
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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="col-span-2">
              <Card className="mb-6">
                <h3 className="text-xl font-semibold mb-4">Job Description</h3>
                <p>{selectedJob?.description || "No description available."}</p>
              </Card>

              <Card className="mb-6">
                <h3 className="text-xl font-semibold mb-4">Responsibilities</h3>
                <p>
                  {selectedJob?.responsibilities ||
                    "No responsibilities listed."}
                </p>
              </Card>

              <Card className="mb-6">
                <h3 className="text-xl font-semibold mb-4">Desirable Skills</h3>
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

            <div>
              <Card className="mb-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-semibold">
                    Applicants ({selectedJob?.applicants?.length || 0})
                  </h3>
                  <a href="#" className="text-green-600 font-medium">
                    View all
                  </a>
                </div>
                <ul className="space-y-3">
                  {selectedJob?.applicants?.map(
                    (applicant: any, index: number) => (
                      <li
                        key={index}
                        className="flex items-center justify-between"
                      >
                        <div className="flex items-center">
                          <img
                            src={
                              applicant.seeker?.profile_image ||
                              "/default-profile.png"
                            }
                            alt={
                              applicant.seeker?.full_name || "Unnamed Applicant"
                            }
                            className="h-8 w-8 rounded-full mr-2"
                          />
                          <span className="font-medium text-gray-900">
                            {applicant.seeker?.full_name || "Unnamed Applicant"}
                          </span>
                        </div>
                        <a
                          // href={applicant.resume?.file}
                          target="_blank"
                          className="text-green-600 font-medium"
                          onClick={() => handleViewClick(applicant.id)}
                        >
                          View
                        </a>
                      </li>
                    )
                  )}
                </ul>
              </Card>

              <Card className="mb-6">
                <h3 className="text-xl font-semibold mb-4">Job Overview</h3>
                <div className="flex flex-col space-y-2">
                  <div className="flex items-center">
                    <CalendarBlank size={20} className="mr-2 text-green-600" />
                    <div>
                      <strong>Job Posted:</strong>{" "}
                      {format(
                        new Date(selectedJob?.created_date),
                        "dd MMM, yyyy"
                      )}
                    </div>
                  </div>
                  <div className="flex items-center">
                    <CalendarBlank size={20} className="mr-2 text-green-600" />
                    <div>
                      <strong>Job Expire in:</strong>{" "}
                      {format(
                        new Date(selectedJob?.expiry_date),
                        "dd MMM, yyyy"
                      )}
                    </div>
                  </div>
                  <div className="flex items-center">
                    <MapTrifold size={20} className="mr-2 text-green-600" />
                    <div>
                      <strong>Location:</strong>{" "}
                      {selectedJob?.location || "Not specified"}
                    </div>
                  </div>
                  <div className="flex items-center">
                    <FaArrowRight size={20} className="mr-2 text-green-600" />
                    <div>
                      <strong>Salary:</strong>
                      {selectedJob?.fixed_salary
                        ? `$${selectedJob.fixed_salary}`
                        : `$${selectedJob?.min_salary} - $${selectedJob?.max_salary}`}
                    </div>
                  </div>
                  <div className="flex items-center">
                    <FaArrowRight size={20} className="mr-2 text-green-600" />
                    <div>
                      <strong>Employment Type:</strong>{" "}
                      {selectedJob?.employment_type || "Not specified"}
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
