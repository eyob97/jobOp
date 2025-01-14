"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { Button, Card } from "flowbite-react";
import { useDispatch } from "react-redux";
import {
  fetchEmployerJobs,
  setActiveTab,
  updateApplicantStatus,
} from "@/app/redux/jobSlice";
import DashboardHeader from "../DashboardHeader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type ApplicantStatus =
  | "Hired"
  | "Pending"
  | "Rejected"
  | "Invited for Interview"
  | "Cancelled";

const ApplicantProfile = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  // const [activeTab, setActiveTab] = useState("filter");
  const activeTab = useSelector((state: any) => state.jobs.activeTab);
  const user = useSelector((state: RootState) => state.auth?.user);
  const { id, applicantId } = useParams<{ id: string; applicantId: string }>();
  const [selectedApplicant, setSelectedApplicant] = useState<any>(null);
  const [isCoverLetterExpanded, setIsCoverLetterExpanded] = useState(false);
  const [status, setStatus] = useState<ApplicantStatus>("Pending");

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const result: any = await dispatch(fetchEmployerJobs());
        const jobs = result.payload.data;
        const job = jobs.find((job: any) => job.id === parseInt(id, 10));
        if (job) {
          const applicant = job.applicants.find(
            (applicant: any) => applicant.id === parseInt(applicantId, 10)
          );
          if (applicant) {
            setSelectedApplicant(applicant);
          } else {
            console.error("Applicant not found");
          }
        } else {
          console.error("Job not found");
        }
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };

    fetchJobs();
  }, [dispatch, id, applicantId]);

  const handleTabChange = (newTab: string) => {
    dispatch(setActiveTab(newTab));
  };
  const handleChangeStatus = async (status: ApplicantStatus) => {
    try {
      await dispatch(
        updateApplicantStatus({
          applicantId: parseInt(applicantId, 10),
          status,
        })
      );
      toast.success(`Applicant status updated to ${status}`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setStatus(status);
    } catch (error) {
      console.error("Error updating applicant status:", error);
      toast.error("Failed to update status", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  console.log(selectedApplicant);
  if (!selectedApplicant) {
    return <p>Loading applicant data...</p>;
  }

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName?.charAt(0) || ""}${
      lastName?.charAt(0) || ""
    }`.toUpperCase();
  };

  const coverLetterPreview = selectedApplicant?.cover_letter?.details
    ?.split("\n")
    .slice(0, 3)
    .join("\n");

  const coverLetterFull = selectedApplicant?.cover_letter?.details;
  return (
    <>
      <DashboardHeader
        onTabChange={handleTabChange}
        activeTab={activeTab}
        userType={user?.user_type || "employer"}
      />
      <div className="bg-gray-50 min-h-screen p-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-extrabold mb-5">Applicant Profile</h2>
          <div className="flex items-center mb-6">
            {selectedApplicant?.seeker?.user?.image ? (
              <img
                src={selectedApplicant?.seeker?.user?.image}
                alt={`${selectedApplicant?.seeker?.user?.first_name} ${selectedApplicant?.seeker?.user?.last_name}`}
                className="h-16 w-16 rounded-full mr-4 border-2 border-gray-300"
              />
            ) : (
              <div className="h-16 w-16 rounded-full mr-4 border-2 border-gray-300 bg-gray-200 flex items-center justify-center text-xl font-bold text-gray-600">
                {getInitials(
                  selectedApplicant?.seeker?.user?.first_name,
                  selectedApplicant?.seeker?.user?.last_name
                )}
              </div>
            )}
            <h2 className="text-3xl font-semibold text-gray-800">
              {`${selectedApplicant?.seeker?.user?.first_name} ${selectedApplicant?.seeker?.user?.last_name}`}
            </h2>
          </div>

          <div className="bg-white shadow-lg rounded-lg p-6">
            <h3 className="text-2xl font-semibold mb-4">Attached Documents</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {selectedApplicant.resume && (
                <Card className="p-4 border rounded-lg hover:shadow-xl transition-shadow">
                  <h4 className="text-lg font-medium mb-3">
                    {`Resume ${selectedApplicant?.resume?.file_name}`}
                  </h4>
                  <Button
                    color="gray"
                    onClick={() =>
                      window.open(selectedApplicant.resume.file, "_blank")
                    }
                    className="w-full"
                  >
                    Download Resume
                  </Button>
                </Card>
              )}
              {selectedApplicant.cover_letter && (
                <Card className="p-4 border rounded-lg hover:shadow-xl transition-shadow">
                  <h4 className="text-lg font-medium mb-3">Cover Letter</h4>
                  <div className="text-sm text-gray-600">
                    {isCoverLetterExpanded
                      ? coverLetterFull
                      : coverLetterPreview}
                    {coverLetterFull &&
                      coverLetterFull.split("\n").length > 3 && (
                        <Button
                          color="gray"
                          onClick={() =>
                            setIsCoverLetterExpanded(!isCoverLetterExpanded)
                          }
                          className="mt-2 w-full"
                        >
                          {isCoverLetterExpanded ? "See Less" : "See More"}
                        </Button>
                      )}
                  </div>
                </Card>
              )}

              {selectedApplicant.motivation_letter && (
                <Card className="p-4 border rounded-lg hover:shadow-xl transition-shadow">
                  <h4 className="text-lg font-medium mb-3">
                    Motivation Letter
                  </h4>
                  <Button
                    color="gray"
                    onClick={() =>
                      window.open(
                        selectedApplicant.motivation_letter.file,
                        "_blank"
                      )
                    }
                    className="w-full"
                  >
                    Download Motivation Letter
                  </Button>
                </Card>
              )}
            </div>

            <div className="mt-6 flex justify-end space-x-4">
              <Button
                color="gray"
                className="px-4 py-2 text-sm rounded-lg"
                onClick={() => handleChangeStatus("Rejected")}
                disabled={
                  status === "Rejected" ||
                  status === "Invited for Interview" ||
                  status === "Hired"
                }
              >
                Reject
              </Button>
              <Button
                color="success"
                className="px-4 py-2 text-sm rounded-lg"
                onClick={() => handleChangeStatus("Invited for Interview")}
                disabled={
                  status === "Rejected" ||
                  status === "Invited for Interview" ||
                  status === "Hired"
                }
              >
                Invite to Interview
              </Button>
              {status === "Invited for Interview" && (
                <Button
                  color="success"
                  className="px-4 py-2 text-sm rounded-lg"
                  onClick={() => handleChangeStatus("Hired")}
                  disabled={status !== "Invited for Interview"}
                >
                  Hired
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ApplicantProfile;
