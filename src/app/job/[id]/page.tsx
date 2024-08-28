"use client";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import CustomButton from "@/app/components/CustomButton";
import { FaArrowRight } from "react-icons/fa";
import { CalendarBlank, MapTrifold } from "phosphor-react";
import { fetchEmployerJobs, setActiveTab } from "@/app/redux/jobSlice";
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
  const activeTab = useSelector((state: any) => state.jobs.activeTab);
  const [selectedJob, setSelectJob] = useState<any>(null);
  // const [activeTab, setActiveTab] = useState("filter");
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
    router.push(`/job/${id}/applicants/${appId}`);
  };

  const handleViewApplicants = () => {
    router.push(`/job/${id}/applicants`);
  };
  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName?.charAt(0) || ""}${
      lastName?.charAt(0) || ""
    }`.toUpperCase();
  };

  const handleTabChange = (newTab: string) => {
    dispatch(setActiveTab(newTab));
  };
  return (
    <>
      <DashboardHeader
        onTabChange={handleTabChange}
        activeTab={activeTab}
        userType={user?.user_type || "employer"}
      />

      <div className="bg-gray-50 min-h-screen p-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white shadow-md rounded-lg p-4 mb-6">
            <div className="flex items-center">
              {/* <img
                src="company-logo.png"
                alt="Company Logo"
                className="h-16 w-16 rounded-full mr-4"
              /> */}
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
                <h3 className="text-xl font-semibold mb-4">Job Details</h3>
                <div>
                  <h4 className="font-medium mb-2">Job Description</h4>
                  <p className="mb-4">
                    {selectedJob?.description || "No description available."}
                  </p>
                  <h4 className="font-medium mb-2">Responsibilities</h4>
                  <p className="mb-4">
                    {selectedJob?.responsibilities ||
                      "No responsibilities listed."}
                  </p>
                  <h4 className="font-medium mb-2">Desirable Skills</h4>
                  <p className="mb-4">
                    {selectedJob?.desirable_skills ||
                      "No desirable skills listed."}
                  </p>
                  <h4 className="font-medium mb-2">Benefits</h4>
                  <ul className="list-disc pl-6">
                    {selectedJob?.benefits?.length > 0 ? (
                      selectedJob?.benefits?.map(
                        (benefit: string, index: number) => (
                          <li key={index}>{benefit}</li>
                        )
                      )
                    ) : (
                      <p>No benefits listed.</p>
                    )}
                  </ul>
                </div>
              </Card>
            </div>

            <div>
              <Card className="mb-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-semibold">
                    Applicants ({selectedJob?.applicants?.length || 0})
                  </h3>
                  <a
                    href="#"
                    className="text-green-600 font-medium"
                    onClick={handleViewApplicants}
                  >
                    View all
                  </a>
                </div>
                <ul className="space-y-3">
                  {selectedJob?.applicants
                    ?.slice(0, 5)
                    .map((applicant: any, index: number) => {
                      const firstName =
                        applicant.seeker?.user?.first_name || "";
                      const lastName = applicant.seeker?.user?.last_name || "";
                      const profileImage = applicant.seeker?.profile_image;

                      return (
                        <li
                          key={index}
                          className="flex items-center justify-between"
                        >
                          <div className="flex items-center">
                            {profileImage ? (
                              <img
                                src={profileImage}
                                alt={`${firstName} ${lastName}`}
                                className="h-8 w-8 rounded-full mr-2"
                              />
                            ) : (
                              <div className="h-8 w-8 rounded-full bg-gray-400 flex items-center justify-center text-white font-medium mr-2">
                                {getInitials(firstName, lastName)}
                              </div>
                            )}
                            <span className="font-medium text-gray-900">
                              {`${firstName} ${lastName}` ||
                                "Unnamed Applicant"}
                            </span>
                          </div>
                          <a
                            target="_blank"
                            className="text-green-600 font-medium cursor-pointer"
                            onClick={() => handleViewClick(applicant.id)}
                          >
                            View
                          </a>
                        </li>
                      );
                    })}
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
                        ? ` R${selectedJob.fixed_salary}`
                        : ` R${selectedJob?.min_salary} - R${selectedJob?.max_salary}`}
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
