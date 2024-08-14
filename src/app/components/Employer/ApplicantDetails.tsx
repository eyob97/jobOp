"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { Button, Card } from "flowbite-react";
import { useDispatch } from "react-redux";
import { fetchEmployerJobs } from "@/app/redux/jobSlice";
import DashboardHeader from "../DashboardHeader";
import { HiUserCircle } from "react-icons/hi";

const ApplicantProfile = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [activeTab, setActiveTab] = useState("filter");
  const user = useSelector((state: RootState) => state.auth?.user);
  const { id, applicantId } = useParams<{ id: string; applicantId: string }>();
  const [selectedApplicant, setSelectedApplicant] = useState<any>(null);
  const [isCoverLetterExpanded, setIsCoverLetterExpanded] = useState(false);

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

  console.log(selectedApplicant);
  if (!selectedApplicant) {
    return <p>Loading applicant data...</p>;
  }
  const coverLetterPreview = selectedApplicant?.cover_letter?.details
    ?.split("\n")
    .slice(0, 3)
    .join("\n");

  const coverLetterFull = selectedApplicant?.cover_letter?.details;
  return (
    <>
      <DashboardHeader
        onTabChange={setActiveTab}
        activeTab={activeTab}
        userType={user?.user_type || "employer"}
      />
      <div className="bg-gray-50 min-h-screen p-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-5">Applicant profile</h2>
          <div className="flex items-center mb-6">
            <img
              src={
                selectedApplicant.seeker.profile_picture || "default-avatar.png"
              }
              alt={selectedApplicant.seeker.full_name}
              className="h-16 w-16 rounded-full mr-4"
            />
            <h2 className="text-2xl font-semibold">
              {selectedApplicant.seeker.full_name}
            </h2>
          </div>

          <div className="bg-white shadow-md rounded-lg p-4">
            <h3 className="text-xl font-semibold mb-3">Attached Documents</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {selectedApplicant.resume && (
                <Card className="mb-4 w-64 p-4">
                  <h4 className="text-lg font-medium mb-2">
                    Resume : {selectedApplicant.resume.file_name}
                  </h4>
                  <Button
                    color="gray"
                    onClick={() =>
                      window.open(selectedApplicant.resume.file, "_blank")
                    }
                  >
                    Download Resume
                  </Button>
                </Card>
              )}
              {selectedApplicant.cover_letter && (
                <Card className="mb-4  p-4">
                  <h4 className="text-lg font-medium mb-2">Cover Letter</h4>
                  <div className="text-sm mb-2">
                    {isCoverLetterExpanded
                      ? coverLetterFull
                      : coverLetterPreview}
                    {coverLetterFull &&
                      coverLetterFull.split("\n").length > 5 && (
                        <Button
                          gradientDuoTone="blueToGreen"
                          onClick={() =>
                            setIsCoverLetterExpanded(!isCoverLetterExpanded)
                          }
                          className="mt-2"
                        >
                          {isCoverLetterExpanded ? "See Less" : "See More"}
                        </Button>
                      )}
                  </div>
                </Card>
              )}

              {selectedApplicant.motivation_letter && (
                <Card className="mb-4 w-64 p-4">
                  <h4 className="text-lg font-medium mb-2">
                    Motivation Letter
                  </h4>
                  <Button
                    gradientDuoTone="greenToBlue"
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

            <div className="mt-4 flex justify-end space-x-4">
              <Button color="gray" className="px-4 py-2 text-sm">
                Reject
              </Button>
              <Button color="gray" className="px-4 py-2 text-sm">
                Invite to Interview
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ApplicantProfile;
