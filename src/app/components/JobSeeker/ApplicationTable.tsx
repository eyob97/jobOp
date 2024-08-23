"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/app/redux/store";
import { fetchApplicants } from "@/app/redux/jobSlice";
import { useRouter } from "next/navigation";

const ApplicationsTable: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const [activeRow, setActiveRow] = useState<number | null>(null);

  const { applicants, isLoading, error } = useSelector(
    (state: RootState) => state.jobs
  );

  useEffect(() => {
    dispatch(fetchApplicants());
  }, [dispatch]);

  const getStatusLabel = (status: string) => {
    switch (status || "Applied") {
      case "Applied":
        return (
          <span className="bg-yellow-200 text-yellow-800 px-2 py-1 rounded">
            Applied
          </span>
        );
      case "Rejected":
        return (
          <span className="bg-red-200 text-red-800 px-2 py-1 rounded">
            Rejected
          </span>
        );
      case "Invited on Interview":
        return (
          <span className="bg-green-200 text-green-800 px-2 py-1 rounded">
            Invited on Interview
          </span>
        );
      default:
        return (
          <span className="bg-green-200/50 text-green-800 px-2 py-1 rounded">
            {status}
          </span>
        );
    }
  };

  const handleRowClick = (applicantId: number) => {
    router.push(`/applicant/${applicantId}`);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="bg-[rgba(214,235,223,1)] min-h-screen p-8">
      <div className="w-full flex justify-between items-center bg-white p-4 shadow-md mb-4">
        <h2 className="text-2xl font-bold mb-2">Your Applications</h2>
      </div>
      <div className="overflow-x-auto">
        {applicants.length === 0 ? (
          <div className="text-center p-4 bg-white shadow-md rounded-lg">
            No applications found.
          </div>
        ) : (
          <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
            <thead>
              <tr>
                <th className="px-6 py-3 border-b-2 border-gray-200 bg-gray-50 text-left text-sm leading-4 text-gray-600 uppercase tracking-wider">
                  Job Name
                </th>
                <th className="px-6 py-3 border-b-2 border-gray-200 bg-gray-50 text-left text-sm leading-4 text-gray-600 uppercase tracking-wider">
                  Applied Date
                </th>
                <th className="px-6 py-3 border-b-2 border-gray-200 bg-gray-50 text-left text-sm leading-4 text-gray-600 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {applicants.map((applicant) => (
                <tr
                  key={applicant.id}
                  onClick={() => handleRowClick(applicant.id)}
                  onMouseEnter={() => setActiveRow(applicant.id)}
                  onMouseLeave={() => setActiveRow(null)}
                  className={`cursor-pointer transition-colors ${
                    activeRow === applicant.id
                      ? "bg-gray-100"
                      : "hover:bg-gray-50"
                  }`}
                  style={{
                    backgroundColor:
                      activeRow === applicant.id ? "#f0f0f0" : "transparent",
                    transition: "background-color 0.3s ease",
                    cursor: "pointer",
                  }}
                >
                  <td className="px-6 py-4 border-b border-gray-200">
                    {applicant.job.job_title}
                  </td>
                  <td className="px-6 py-4 border-b border-gray-200">
                    {new Date(applicant.created_date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 border-b border-gray-200">
                    {getStatusLabel(applicant.status)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default ApplicationsTable;
