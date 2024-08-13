import { fetchEmployerJobs, setSelectedJob } from "@/app/redux/jobSlice";
import { AppDispatch } from "@/app/redux/store";
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

interface JobApplicationResponse {
  id: number;
  job_title: string;
  created_date: string;
  expiry_date: string;
  status: string;
  applicants: Applicant[];
}

interface Applicant {
  id: number;
  seeker: {
    full_name: string;
    email: string;
    age: number;
    location: string;
    skills: string;
    education: string;
  };
}

const Applications = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const [applications, setApplications] = useState<JobApplication[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const result: any = await dispatch(fetchEmployerJobs());
        const jobResponses: JobApplicationResponse[] = result.payload.data;

        const transformedApplications: JobApplication[] = jobResponses.map(
          (job) => ({
            id: job.id,
            jobName: job.job_title,
            postDate: new Date(job.created_date).toLocaleDateString(),
            applicants: job.applicants.length,
            status: job.status,
            dueTime: new Date(job.expiry_date).toLocaleDateString(),
          })
        );

        setApplications(transformedApplications);
      } catch (error) {
        console.error("Failed to fetch applications", error);
        setError("Failed to load job applications");
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [dispatch]);

  const filteredApplications = applications.filter((app) =>
    app.jobName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleClick = (jobId: number) => {
    dispatch(setSelectedJob(jobId));
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
        {loading ? (
          <div className="text-center p-4 bg-white shadow-md rounded-lg">
            Loading...
          </div>
        ) : error ? (
          <div className="text-center p-4 bg-white shadow-md rounded-lg text-red-500">
            {error}
          </div>
        ) : filteredApplications.length === 0 ? (
          <div className="text-center p-4 bg-white shadow-md rounded-lg">
            No job applications found.
          </div>
        ) : (
          <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
            <thead>
              <tr>
                <th className="px-6 py-3 border-b-2 border-gray-200 bg-gray-50 text-left text-sm leading-4 text-gray-600 uppercase tracking-wider">
                  Job Title
                </th>
                <th className="px-6 py-3 border-b-2 border-gray-200 bg-gray-50 text-left text-sm leading-4 text-gray-600 uppercase tracking-wider">
                  Posted Date
                </th>
                <th className="px-6 py-3 border-b-2 border-gray-200 bg-gray-50 text-left text-sm leading-4 text-gray-600 uppercase tracking-wider">
                  Applicants
                </th>
                <th className="px-6 py-3 border-b-2 border-gray-200 bg-gray-50 text-left text-sm leading-4 text-gray-600 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredApplications.map((app) => (
                <tr
                  key={app.id}
                  onClick={() => handleClick(app.id)}
                  className="cursor-pointer"
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
                      app.status === "Open" ? "text-green-500" : "text-red-500"
                    }`}
                  >
                    {app.status}
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
