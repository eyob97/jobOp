"use client";

import { useState, ChangeEvent, useEffect } from "react";
import { Button, Label, TextInput, Modal } from "flowbite-react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { createJobPost, fetchApplicants } from "../../redux/jobSlice";
import { clearError } from "../../redux/resumeSlice";
import { CountryDropdown } from "react-country-region-selector";

interface JobPost {
  company: number;
  job_title: string;
  description: string;
  responsibilities: string;
  desirable_skills: string;
  fixed_salary: number;
  min_salary: number;
  max_salary: number;
  location: string;
  expiry_date: string;
  work_type: "Remote" | "On Site" | "Hybrid";
  employment_type: "Full Time" | "Part Time" | "Any";
  status: "Open" | "Closed" | "On Hold";
}

interface JobPostFormProps {
  setView: (view: string) => void;
}

const JobPostForm: React.FC<JobPostFormProps> = ({ setView }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { error } = useSelector((state: RootState) => state.resume);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [jobPostData, setJobPostData] = useState<JobPost>({
    company: 35,
    job_title: "",
    description: "",
    responsibilities: "",
    desirable_skills: "",
    fixed_salary: 80000,
    min_salary: 70000,
    max_salary: 90000,
    location: "",
    expiry_date: "",
    work_type: "On Site",
    employment_type: "Part Time",
    status: "Open",
  });

  useEffect(() => {
    if (error) {
      setErrors({ general: error.details || "An error occurred. Please try again later." });
      dispatch(clearError());
    }
  }, [error, dispatch]);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { id, value } = e.target;
    setJobPostData({ ...jobPostData, [id]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setSuccessMessage(null);

    try {
      await createNewJobPost();
    } catch (error: any) {
      setErrors({ general: error.message || "Failed to save job post." });
    }
  };

  const createNewJobPost = async () => {
    const resultAction = await dispatch(createJobPost(jobPostData));

    if (createJobPost.fulfilled.match(resultAction)) {
      setSuccessMessage("Job post created successfully.");
      setIsModalOpen(true);
    } else {
      const payload = resultAction.payload as any;
      setErrors(payload || { general: "Failed to create job post." });
    }
  };
  const handleLocationChange = (val: string) => {
    setJobPostData({ ...jobPostData, location: val });
  };
  return (
    <div>
      <h2 className="mb-5 text-lg font-bold text-black">Job Post</h2>
      {successMessage && (
        <div className="mb-4 text-green-500">{successMessage}</div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <Label htmlFor="job_title" className="block text-sm font-medium text-gray-700">
            Job Title
          </Label>
          <TextInput
            id="job_title"
            type="text"
            className="mt-1 w-full"
            value={jobPostData.job_title}
            onChange={handleInputChange}
          />
          {errors.job_title && <p className="text-red-500">{errors.job_title}</p>}
        </div>
        <div className="mb-4">
          <Label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Description
          </Label>
          <TextInput
            id="description"
            type="text"
            className="mt-1 w-full"
            value={jobPostData.description}
            onChange={handleInputChange}
          />
          {errors.description && <p className="text-red-500">{errors.description}</p>}
        </div>
        <div className="mb-4">
          <Label htmlFor="responsibilities" className="block text-sm font-medium text-gray-700">
            Responsibilities
          </Label>
          <TextInput
            id="responsibilities"
            type="text"
            className="mt-1 w-full"
            value={jobPostData.responsibilities}
            onChange={handleInputChange}
          />
          {errors.responsibilities && (
            <p className="text-red-500">{errors.responsibilities}</p>
          )}
        </div>
        <div className="mb-4">
          <Label htmlFor="desirable_skills" className="block text-sm font-medium text-gray-700">
            Desirable Skills
          </Label>
          <TextInput
            id="desirable_skills"
            type="text"
            className="mt-1 w-full"
            value={jobPostData.desirable_skills}
            onChange={handleInputChange}
          />
          {errors.desirable_skills && (
            <p className="text-red-500">{errors.desirable_skills}</p>
          )}
        </div>
        <div className="mb-4">
          <Label htmlFor="fixed_salary" className="block text-sm font-medium text-gray-700">
            Fixed Salary
          </Label>
          <TextInput
            id="fixed_salary"
            type="number"
            className="mt-1 w-full"
            value={jobPostData.fixed_salary.toString()}
            onChange={handleInputChange}
          />
          {errors.fixed_salary && (
            <p className="text-red-500">{errors.fixed_salary}</p>
          )}
        </div>
        <div className="mb-4">
          <Label htmlFor="min_salary" className="block text-sm font-medium text-gray-700">
            Minimum Salary
          </Label>
          <TextInput
            id="min_salary"
            type="number"
            className="mt-1 w-full"
            value={jobPostData.min_salary.toString()}
            onChange={handleInputChange}
          />
          {errors.min_salary && (
            <p className="text-red-500">{errors.min_salary}</p>
          )}
        </div>
        <div className="mb-4">
          <Label htmlFor="max_salary" className="block text-sm font-medium text-gray-700">
            Maximum Salary
          </Label>
          <TextInput
            id="max_salary"
            type="number"
            className="mt-1 w-full"
            value={jobPostData.max_salary.toString()}
            onChange={handleInputChange}
          />
          {errors.max_salary && (
            <p className="text-red-500">{errors.max_salary}</p>
          )}
        </div>
        <div className="mb-4">
          <Label
            htmlFor="location"
            className="block text-sm font-medium text-gray-700"
          >
            Location
          </Label>
          <CountryDropdown
            value={jobPostData.location}
            onChange={(val) => handleLocationChange(val)}
            classes="form-control mt-1 w-full"
          />
          {errors.location && <p className="text-red-500">{errors.location}</p>}
        </div>
        <div className="mb-4">
          <Label htmlFor="expiry_date" className="block text-sm font-medium text-gray-700">
            Expiry Date
          </Label>
          <TextInput
            id="expiry_date"
            type="date"
            className="mt-1 w-full"
            value={jobPostData.expiry_date}
            onChange={handleInputChange}
          />
          {errors.expiry_date && (
            <p className="text-red-500">{errors.expiry_date}</p>
          )}
        </div>
        <div className="mb-4">
          <Label htmlFor="work_type" className="block text-sm font-medium text-gray-700">
            Work Type
          </Label>
          <select
            id="work_type"
            className="mt-1 w-full"
            value={jobPostData.work_type}
            onChange={handleInputChange}
          >
            <option value="Remote">Remote</option>
            <option value="On Site">On Site</option>
            <option value="Hybrid">Hybrid</option>
          </select>
          {errors.work_type && (
            <p className="text-red-500">{errors.work_type}</p>
          )}
        </div>
        <div className="mb-4">
          <Label htmlFor="employment_type" className="block text-sm font-medium text-gray-700">
            Employment Type
          </Label>
          <select
            id="employment_type"
            className="mt-1 w-full"
            value={jobPostData.employment_type}
            onChange={handleInputChange}
          >
            <option value="Full Time">Full Time</option>
            <option value="Part Time">Part Time</option>
            <option value="Any">Any</option>
          </select>
          {errors.employment_type && (
            <p className="text-red-500">{errors.employment_type}</p>
          )}
        </div>
        <div className="mb-4">
          <Label htmlFor="status" className="block text-sm font-medium text-gray-700">
            Status
          </Label>
          <select
            id="status"
            className="mt-1 w-full"
            value={jobPostData.status}
            onChange={handleInputChange}
          >
            <option value="Open">Open</option>
            <option value="Closed">Closed</option>
            <option value="On Hold">On Hold</option>
          </select>
          {errors.status && <p className="text-red-500">{errors.status}</p>}
        </div>
        <div className="flex justify-end gap-4">
          <Button
            type="button"
            className="w-full rounded-full text-black"
            style={{ backgroundColor: "#000", color: "#fff" }}
            onClick={() => setView("initial")}
          >
            Back
          </Button>
          <Button
            type="submit"
            className="w-full rounded-full text-black"
            style={{ backgroundColor: "#FFC424", color: "#000" }}
          >
            Save
          </Button>
        </div>
        {errors.general && <p className="text-red-500 mt-2">{errors.general}</p>}
      </form>
      <Modal
        show={isModalOpen}
        size="md"
        popup={true}
        onClose={() => setIsModalOpen(false)}
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <h3 className="mb-5 text-lg font-normal text-green-500 dark:text-green-400">
              {successMessage}
            </h3>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default JobPostForm;
