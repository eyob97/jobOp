import { setSelectedJob } from "@/app/redux/jobSlice";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

interface JobApplication {
  id: number;
  jobName: string;
  postDate: string;
  applicants: number;
  status: string;
  dueTime: string;
}

const Applications = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [applications, setApplications] = useState<JobApplication[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const sampleData: JobApplication[] = [
      {
        id: 7,
        jobName: "Professional cleaner",
        postDate: "Apr 23, 2024",
        applicants: 23,
        status: "Active",
        dueTime: "May 23, 2024",
      },
      {
        id: 2,
        jobName: "Cleaner",
        postDate: "Apr 23, 2024",
        applicants: 11,
        status: "Deactivated",
        dueTime: "May 23, 2024",
      },
      {
        id: 3,
        jobName: "Waiter",
        postDate: "Apr 18, 2024",
        applicants: 13,
        status: "Active",
        dueTime: "May 18, 2024",
      },
    ];
    setApplications(sampleData);
  }, []);

  const filteredApplications = applications.filter((app) =>
    app.jobName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleClick = (jobId: number) => {
    dispatch(setSelectedJob(7));
    router.push(`/job/${jobId}`);
  };
  return (
    <div className="bg-[rgba(214,235,223,1)] min-h-screen p-8">
      <div className="w-full flex justify-between items-center bg-white p-4 shadow-md mb-4">
        <h2 className="text-2xl font-bold mb-2">Job Applications</h2>
        <div className="flex items-center">
          <input
            type="text"
            placeholder="Search job applications..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mr-2"
          />
        </div>
      </div>
      <div className="overflow-x-auto">
        {filteredApplications.length === 0 ? (
          <div className="text-center p-4 bg-white shadow-md rounded-lg">
            No job applications found.
          </div>
        ) : (
          <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
            <thead>
              <tr>
                <th className="px-6 py-3 border-b-2 border-gray-200 bg-gray-50 text-left text-sm leading-4 text-gray-600 uppercase tracking-wider">
                  Job Name
                </th>
                <th className="px-6 py-3 border-b-2 border-gray-200 bg-gray-50 text-left text-sm leading-4 text-gray-600 uppercase tracking-wider">
                  Post Date
                </th>
                <th className="px-6 py-3 border-b-2 border-gray-200 bg-gray-50 text-left text-sm leading-4 text-gray-600 uppercase tracking-wider">
                  Applicants
                </th>
                <th className="px-6 py-3 border-b-2 border-gray-200 bg-gray-50 text-left text-sm leading-4 text-gray-600 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 border-b-2 border-gray-200 bg-gray-50 text-left text-sm leading-4 text-gray-600 uppercase tracking-wider">
                  Due Time
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredApplications.map((app) => (
                <tr
                  key={app.id}
                  onClick={() => handleClick(app.id)}
                  className="cursor-pointer	"
                >
                  <td className="px-6 py-4 border-b border-gray-200">
                    {app.jobName}
                  </td>
                  <td className="px-6 py-4 border-b border-gray-200">
                    {app.postDate}
                  </td>
                  <td className="px-6 py-4 border-b border-gray-200">
                    {app.applicants}
                  </td>
                  <td
                    className={`px-6 py-4 border-b border-gray-200 ${
                      app.status === "Active"
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    {app.status}
                  </td>
                  <td className="px-6 py-4 border-b border-gray-200">
                    {app.dueTime}
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

export default Applications;
