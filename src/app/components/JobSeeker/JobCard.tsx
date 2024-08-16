"use client";

import React, { useEffect, useState } from "react";
import { Button, Card } from "flowbite-react";
import { useDispatch, useSelector } from "react-redux";
import { FaRegBookmark, FaBookmark, FaMapMarkerAlt } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { RootState, AppDispatch } from "../../redux/store";
import { fetchJobs, setSelectedJob } from "../../redux/jobSlice";
import { format } from "date-fns";

interface JobCardProps {
  searchCriteria: {
    jobTitle: string;
    location: string;
    filter: string;
  };
}

const JobCard: React.FC<JobCardProps> = ({ searchCriteria }) => {
  const dispatch = useDispatch<AppDispatch>();
  const jobs = useSelector((state: RootState) => state.jobs.jobs);
  const isLoading = useSelector((state: RootState) => state.jobs.isLoading);
  const error = useSelector((state: RootState) => state.jobs.error);
  const [savedJobs, setSavedJobs] = useState<Set<string>>(new Set());
  const router = useRouter();

  useEffect(() => {
    dispatch(fetchJobs());
  }, [dispatch]);

  const filteredJobs = jobs.filter((job) => {
    const matchesTitle =
      job.title
        ?.toLowerCase()
        .includes(searchCriteria.jobTitle.toLowerCase()) ?? false;
    const matchesLocation =
      job.location
        ?.toLowerCase()
        .includes(searchCriteria.location.toLowerCase()) ?? false;
    const matchesFilter = searchCriteria.filter
      ? job.type === searchCriteria.filter
      : true;
    return matchesTitle && matchesLocation && matchesFilter;
  });
  const toggleSaveJob = (jobId: string, event: React.MouseEvent) => {
    event.stopPropagation();
    setSavedJobs((prevSavedJobs) => {
      const newSavedJobs = new Set(prevSavedJobs);
      if (newSavedJobs.has(jobId)) {
        newSavedJobs.delete(jobId);
      } else {
        newSavedJobs.add(jobId);
      }
      return newSavedJobs;
    });
  };

  const handleJobClick = (jobId: number) => {
    dispatch(setSelectedJob(jobId));
    router.push(`/pages/job/${jobId}`);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {!isLoading && filteredJobs.length === 0 && (
        <p>No jobs found based on your search criteria...</p>
      )}
      {filteredJobs.length > 0 &&
        filteredJobs.map((job: any) => {
          return (
            <Card
              key={job.id}
              className="max-w-sm cursor-pointer"
              onClick={() => handleJobClick(job.id)}
            >
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-medium">{job.title}</h3>
                <h5 className="text-lg font-medium">
                  {job?.is_applied ? "Applied" : undefined}
                </h5>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span
                  className={`px-2 py-1 rounded ${
                    job.type === "Part-time"
                      ? "bg-blue-200 text-blue-800"
                      : "bg-green-200 text-green-800"
                  }`}
                >
                  {job.type}
                </span>
                <div className="text-gray-600">Salary: {job?.salary}</div>
              </div>
              <p className="text-sm text-gray-600 mb-4">
                {typeof job.description === "string"
                  ? job?.description
                  : "No description available"}
              </p>
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <img
                    src={job?.companyLogo}
                    alt="Company Logo"
                    className="w-8 h-8 bg-gray-300 mr-2 rounded-sm"
                  />
                  <div>
                    <p className="text-sm font-medium">{job?.company?.name}</p>
                    <p className="text-sm text-gray-600 flex items-center">
                      <FaMapMarkerAlt className="mr-1 text-green-600" />{" "}
                      {job?.location}
                    </p>
                  </div>
                </div>
                <Button
                  className="text-gray-400 hover:text-gray-600"
                  onClick={(e: any) => toggleSaveJob(job.id.toString(), e)}
                >
                  {savedJobs.has(job.id.toString()) ? (
                    <FaBookmark className="w-6 h-6" />
                  ) : (
                    <FaRegBookmark className="w-6 h-6" />
                  )}
                </Button>
              </div>
              <div className="text-sm text-gray-600">
                Posted: {format(new Date(job.postedDate), "PPP")}
              </div>
            </Card>
          );
        })}
    </div>
  );
};

export default JobCard;
