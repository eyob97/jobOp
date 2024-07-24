'use client';

import { Card } from 'flowbite-react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { FaRegBookmark, FaBookmark, FaMapMarkerAlt } from 'react-icons/fa'; 
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { setSelectedJob } from '../redux/jobSlice';

interface Job {
  id: string;
  title: string;
  type: string;
  salary: string;
  description: string;
  company: string;
  location: string;
  companyLogo: string;
}

interface JobCardProps {
  searchCriteria: {
    jobTitle: string;
    location: string;
    filter: string;
  };
}

const JobCard: React.FC<JobCardProps> = ({ searchCriteria }) => {
  const jobs = useSelector((state: RootState) => state.jobs.jobs);
  const [savedJobs, setSavedJobs] = useState<Set<string>>(new Set());
  const dispatch = useDispatch();
  const router = useRouter();
  const filteredJobs = jobs.filter((job: any) => {
    const matchesTitle = job.title.toLowerCase().includes(searchCriteria.jobTitle.toLowerCase());
    const matchesLocation = job.location.toLowerCase().includes(searchCriteria.location.toLowerCase());
    const matchesFilter = searchCriteria.filter ? job.type === searchCriteria.filter : true;
    return matchesTitle && matchesLocation && matchesFilter;
  });

  const toggleSaveJob = (jobId: string, event: React.MouseEvent) => {
    event.stopPropagation();
    setSavedJobs(prevSavedJobs => {
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
        {filteredJobs.map((job) => (
          <Card key={job.id} className="max-w-sm cursor-pointer" onClick={() => handleJobClick(job.id)}>
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-medium">{job.title}</h3>
            </div>
            <div className="flex justify-between items-center mb-2">
              <span
                className={`px-2 py-1 rounded ${job.type === 'Part-time' ? 'bg-blue-200 text-blue-800' : 'bg-green-200 text-green-800'}`}
              >
                {job.type}
              </span>
              <div className="text-gray-600">Salary: {job.salary}</div>
            </div>
            <p className="text-sm text-gray-600 mb-4">{job.description}</p>
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <img
                  src={job.companyLogo}
                  alt="Company Logo"
                  className="w-8 h-8 bg-gray-300 mr-2 rounded-sm"
                />
                <div>
                  <p className="text-sm font-medium">{job.company}</p>
                  <p className="text-sm text-gray-600 flex items-center">
                    <FaMapMarkerAlt className="mr-1 text-green-600" /> {job.location}
                  </p>
                </div>
              </div>
              <button className="text-gray-400 hover:text-gray-600" onClick={(e) => toggleSaveJob(job.id.toString(), e)}>
                {savedJobs.has(job.id.toString()) ? <FaBookmark className="w-6 h-6" /> : <FaRegBookmark className="w-6 h-6" />}
              </button>
            </div>
          </Card>
        ))}
      </div>

  );
};

export default JobCard;
