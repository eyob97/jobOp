"use client";

import { useState, ChangeEvent, useEffect } from "react";
import { Button, Label, TextInput, Card } from "flowbite-react";
import Select from "react-select";

interface Job {
  companyName: string;
  jobTitle: string;
  startDate: string;
  endDate: string;
  description: string;
}

interface JobSeekerProfileFormProps {
  setView: (view: string) => void;
  initialData?: any;
}

const JobSeekerProfileForm: React.FC<JobSeekerProfileFormProps> = ({ setView, initialData }) => {
  const [employmentHistory, setEmploymentHistory] = useState<Job[]>([
    {
      companyName: "",
      jobTitle: "",
      startDate: "",
      endDate: "",
      description: "",
    },
  ]);

  const [profileData, setProfileData] = useState({
    fullName: "",
    jobTitle: "",
    location: "",
    preference: "full-time",
  });

  useEffect(() => {
    if (initialData) {
      setProfileData({
        fullName: initialData.full_name || "",
        jobTitle: initialData.current_work_status || "",
        location: initialData.location || "",
        preference: initialData.work_status || "full-time",
      });

      setEmploymentHistory(
        initialData.employment_history.map((job: any) => ({
          companyName: job.company_name,
          jobTitle: job.job_title,
          startDate: job.start_date,
          endDate: job.end_date,
          description: job.description || "",
        }))
      );
    }
  }, [initialData]);

  const handleAddJob = () => {
    setEmploymentHistory([
      ...employmentHistory,
      {
        companyName: "",
        jobTitle: "",
        startDate: "",
        endDate: "",
        description: "",
      },
    ]);
  };

  const handleRemoveJob = (index: number) => {
    const updatedHistory = employmentHistory.filter((_, i) => i !== index);
    setEmploymentHistory(updatedHistory);
  };

  const handleChange = (index: number, field: keyof Job, value: string) => {
    const updatedHistory = [...employmentHistory];
    updatedHistory[index][field] = value;
    setEmploymentHistory(updatedHistory);
  };

  return (
    <div>
      <h2 className="mb-5 text-lg font-bold text-black">Job Seeker Profile</h2>
      <form>
        <div className="mb-4">
          <Label
            htmlFor="fullName"
            className="block text-sm font-medium text-gray-700"
          >
            Full Name
          </Label>
          <TextInput
            id="fullName"
            type="text"
            className="mt-1 w-full"
            value={profileData.fullName}
            onChange={(e) => setProfileData({ ...profileData, fullName: e.target.value })}
          />
        </div>
        <div className="mb-4">
          <Label
            htmlFor="jobTitle"
            className="block text-sm font-medium text-gray-700"
          >
            Job Title
          </Label>
          <TextInput
            id="jobTitle"
            type="text"
            className="mt-1 w-full"
            value={profileData.jobTitle}
            onChange={(e) => setProfileData({ ...profileData, jobTitle: e.target.value })}
          />
        </div>
        <div className="mb-4">
          <Label
            htmlFor="location"
            className="block text-sm font-medium text-gray-700"
          >
            Location
          </Label>
          <Select
            id="location"
            className="mt-1 w-full"
            value={{ value: profileData.location, label: profileData.location }}
            options={[
              { value: "Poland", label: "Poland" },
              { value: "Germany", label: "Germany" },
            ]}
            onChange={(selectedOption) => setProfileData({ ...profileData, location: selectedOption?.value || "" })}
          />
        </div>
        <div className="mb-4">
          <Label className="block text-sm font-medium text-gray-700">
            Preferences
          </Label>
          <div className="flex gap-4">
            <div className="flex items-center">
              <input
                type="radio"
                id="full-time"
                name="preference"
                value="full-time"
                className="mr-2"
                checked={profileData.preference === "full-time"}
                onChange={(e) => setProfileData({ ...profileData, preference: e.target.value })}
              />
              <Label htmlFor="full-time">Full time</Label>
            </div>
            <div className="flex items-center">
              <input
                type="radio"
                id="part-time"
                name="preference"
                value="part-time"
                className="mr-2"
                checked={profileData.preference === "part-time"}
                onChange={(e) => setProfileData({ ...profileData, preference: e.target.value })}
              />
              <Label htmlFor="part-time">Part time</Label>
            </div>
            <div className="flex items-center">
              <input
                type="radio"
                id="any"
                name="preference"
                value="any"
                className="mr-2"
                checked={profileData.preference === "any"}
                onChange={(e) => setProfileData({ ...profileData, preference: e.target.value })}
              />
              <Label htmlFor="any">Any</Label>
            </div>
          </div>
        </div>

        <h3 className="mb-5 text-lg font-bold text-black">
          Employment History
        </h3>

        {employmentHistory.map((job, index) => (
          <div key={index} className="mb-4 border-b pb-4">
            <div className="mb-4">
              <Label
                htmlFor={`companyName-${index}`}
                className="block text-sm font-medium text-gray-700"
              >
                Company Name
              </Label>
              <TextInput
                id={`companyName-${index}`}
                type="text"
                className="mt-1 w-full"
                value={job.companyName}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  handleChange(index, "companyName", e.target.value)
                }
              />
            </div>
            <div className="mb-4">
              <Label
                htmlFor={`jobTitle-${index}`}
                className="block text-sm font-medium text-gray-700"
              >
                Job Title
              </Label>
              <TextInput
                id={`jobTitle-${index}`}
                type="text"
                className="mt-1 w-full"
                value={job.jobTitle}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  handleChange(index, "jobTitle", e.target.value)
                }
              />
            </div>
            <div className="mb-4">
              <Label
                htmlFor={`startDate-${index}`}
                className="block text-sm font-medium text-gray-700"
              >
                Start Date
              </Label>
              <TextInput
                id={`startDate-${index}`}
                type="date"
                className="mt-1 w-full"
                value={job.startDate}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  handleChange(index, "startDate", e.target.value)
                }
              />
            </div>
            <div className="mb-4">
              <Label
                htmlFor={`endDate-${index}`}
                className="block text-sm font-medium text-gray-700"
              >
                End Date
              </Label>
              <TextInput
                id={`endDate-${index}`}
                type="date"
                className="mt-1 w-full"
                value={job.endDate}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  handleChange(index, "endDate", e.target.value)
                }
              />
            </div>
            <div className="mb-4">
              <Label
                htmlFor={`description-${index}`}
                className="block text-sm font-medium text-gray-700"
              >
                Description
              </Label>
              <TextInput
                id={`description-${index}`}
                type="text"
                className="mt-1 w-full"
                value={job.description}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  handleChange(index, "description", e.target.value)
                }
              />
            </div>
            {employmentHistory.length > 1 && (
              <Button
                type="button"
                color="failure"
                className="mb-4"
                onClick={() => handleRemoveJob(index)}
              >
                Remove Job
              </Button>
            )}
          </div>
        ))}
        <Button
          type="button"
          color="primary"
          className="mb-4"
          onClick={handleAddJob}
        >
          Add Job
        </Button>
        <div className="flex justify-end gap-4">
          <Button
            type="submit"
            className="w-full rounded-full text-black"
            style={{ backgroundColor: "#000", color: "#fff" }}
            onClick={() => setView("initial")}
          >
            Back{" "}
          </Button>
          <Button
            type="submit"
            className="w-full rounded-full text-black"
            style={{ backgroundColor: "#FFC424", color: "#000" }}
          >
            Save
          </Button>
        </div>
      </form>
    </div>
  );
};

export default JobSeekerProfileForm;
