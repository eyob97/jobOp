"use client";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/store";
import { fetchEmployerJobs } from "@/app/redux/jobSlice";
import DashboardHeader from "@/app/components/DashboardHeader";

const page = () => {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const [activeTab, setActiveTab] = useState("filter");
  const user = useSelector((state: RootState) => state.auth?.user);
  const [selectedJob, setSelectJob] = useState<any>(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const jobs: any = await dispatch(fetchEmployerJobs());

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

  const handleViewClick = (appId: number) => {
    router.push(`/job/${id}/applicants/${appId}`);
  };

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName?.charAt(0) || ""}${
      lastName?.charAt(0) || ""
    }`.toUpperCase();
  };

  if (!selectedJob) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <DashboardHeader
        onTabChange={setActiveTab}
        activeTab={activeTab}
        userType={user?.user_type || "employer"}
      />
      <div className="p-4 mt-5 w-75 ml-10">
        <h1 className="text-xl font-bold mb-4">{selectedJob.job_title}</h1>

        {selectedJob.applicants?.length > 0 ? (
          <table className="min-w-full bg-white border border-gray-300">
            <thead className="bg-gray-100">
              <tr>
                <th className="text-left py-2 px-4 border-b">Full Name</th>
                <th className="text-left py-2 px-4 border-b">Email</th>
                <th className="text-left py-2 px-4 border-b">Location</th>
                <th className="text-left py-2 px-4 border-b">Phone Number</th>
                <th className="text-left py-2 px-4 border-b">Status</th>
                <th className="text-left py-2 px-4 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {selectedJob.applicants.map((applicant: any) => {
                const firstName = applicant.seeker.user.first_name;
                const lastName = applicant.seeker.user.last_name;
                const fullName = `${firstName} ${lastName}`;

                const profileImage = applicant.seeker.profile_image || null;

                return (
                  <tr
                    key={applicant.id}
                    className="hover:bg-gray-50 cursor-pointer"
                  >
                    <td className="py-2 px-4 border-b flex items-center">
                      {profileImage ? (
                        <img
                          src={profileImage}
                          alt="Profile"
                          className="w-8 h-8 rounded-full mr-2"
                        />
                      ) : (
                        <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-white mr-2">
                          {getInitials(firstName, lastName)}
                        </div>
                      )}
                      {fullName}
                    </td>
                    <td className="py-2 px-4 border-b">
                      {applicant.seeker.user.email}
                    </td>
                    <td className="py-2 px-4 border-b">
                      {applicant.seeker.location || "N/A"}
                    </td>
                    <td className="py-2 px-4 border-b">
                      {applicant.seeker.user.phone_number || "N/A"}
                    </td>
                    <td className="py-2 px-4 border-b">
                      {applicant.status || "Pending"}
                    </td>
                    <td className="py-2 px-4 border-b">
                      <button
                        className="text-blue-500 hover:underline"
                        onClick={() => handleViewClick(applicant.id)}
                      >
                        View
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <p>No applicants found for this job.</p>
        )}
      </div>
    </>
  );
};

export default page;
