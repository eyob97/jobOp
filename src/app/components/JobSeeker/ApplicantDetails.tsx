"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/app/redux/store";
import { fetchApplicants } from "@/app/redux/jobSlice";
import DashboardHeader from "@/app/components/DashboardHeader";
import { useParams } from "next/navigation";
import withAuth from "../withAuth";

const ApplicantDetails = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [activeTab, setActiveTab] = useState("applications");
  const user = useSelector((state: RootState) => state.auth?.user);
  const { applicants, isLoading, error } = useSelector(
    (state: RootState) => state.jobs || {}
  );
  const { id } = useParams();

  useEffect(() => {
    dispatch(fetchApplicants());
  }, [dispatch]);

  const applicantId = Array.isArray(id) ? parseInt(id[0]) : parseInt(id);

  const applicant: any = applicants?.find(
    (applicant: any) => applicant.id === applicantId
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!applicant) {
    return <div>Applicant not found</div>;
  }

  const { job, resume, cover_letter, motivation_letter } = applicant;

  return (
    <>
      <DashboardHeader
        onTabChange={setActiveTab}
        activeTab={activeTab}
        userType={user?.user_type || "employer"}
      />
      <div className="mt-10 p-6 bg-white rounded-lg shadow-md">
        <h3 className="text-4xl font-bold mb-5">Job Application Details</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="text-2xl font-semibold mb-3">Job Details</h4>
            <p>
              <strong>Title:</strong> {job?.job_title}
            </p>
            <p>
              <strong>Description:</strong> {job?.description}
            </p>
            <p>
              <strong>Responsibilities:</strong> {job?.responsibilities}
            </p>
            <p>
              <strong>Location:</strong> {job?.location}
            </p>
            <p>
              <strong>Skills Required:</strong>{" "}
              {job?.predefined_skills?.join(", ")}
            </p>
            <p>
              <strong>Status:</strong> {job?.status}
            </p>
          </div>

          <div>
            <h4 className="text-2xl font-semibold mb-3">Applicant Details</h4>
            <img
              src={applicant?.seeker?.user?.image}
              alt={`${applicant?.seeker?.user?.first_name} ${applicant?.seeker?.user?.last_name}`}
              className="w-32 h-32 rounded-full mb-4"
            />
            <p>
              <strong>Name:</strong> {applicant?.seeker?.user?.first_name}{" "}
              {applicant?.seeker?.user?.last_name}
            </p>
            <p>
              <strong>Email:</strong> {applicant?.seeker?.user?.email}
            </p>
          </div>
        </div>

        <div className="mt-6">
          <h4 className="text-2xl font-semibold mb-3">Attached Documents</h4>
          <ul className="list-none">
            <li className="mb-2">
              <strong>Resume:</strong>{" "}
              <a
                href={resume?.file}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                {resume?.file_name}
              </a>
            </li>
            {cover_letter && (
              <li className="mb-2">
                <strong>Cover Letter:</strong>{" "}
                <a
                  href={cover_letter?.file}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  {cover_letter?.file_name}
                </a>
              </li>
            )}
            {motivation_letter && (
              <li>
                <strong>Motivation Letter:</strong>{" "}
                <a
                  href={motivation_letter?.file}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  {motivation_letter?.file_name}
                </a>
              </li>
            )}
          </ul>
        </div>
      </div>
    </>
  );
};

export default withAuth(ApplicantDetails);
