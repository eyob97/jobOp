"use client";

import { useState, ChangeEvent, useEffect } from "react";
import {
  Button,
  Label,
  TextInput,
  Modal,
  Textarea,
  Select,
  Checkbox,
} from "flowbite-react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import {
  createJobPost,
  fetchEmployerCompany,
  getSkills,
} from "../../redux/jobSlice";
import { clearError } from "../../redux/resumeSlice";
import { useRouter } from "next/navigation";

interface JobPost {
  company?: number;
  job_title: string;
  description: string;
  responsibilities: string;
  desirable_skills: string[];
  fixed_salary?: number;
  min_salary?: number;
  max_salary?: number;
  location: string;
  expiry_date: string;
  work_type: "Remote" | "On Site" | "Hybrid";
  employment_type: "Full Time" | "Part Time" | "Any";
  status: "Open" | "Closed" | "On Hold";
  skills: string[];
}

interface Skill {
  id: number;
  name: string;
  sector: {
    id: number;
    name: string;
  };
}

interface JobPostFormProps {
  setView: (view: string) => void;
  extractedJob?: any;
}

const JobPostForm: React.FC<JobPostFormProps> = ({ setView, extractedJob }) => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { error } = useSelector((state: RootState) => state.resume);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [showSalaryRange, setShowSalaryRange] = useState(false);
  const [company, setCompany] = useState<{ id: number }>();
  const [jobPostData, setJobPostData] = useState<JobPost>({
    company: company?.id,
    job_title: "",
    description: "",
    responsibilities: "",
    desirable_skills: [],
    skills: [],
    fixed_salary: undefined,
    min_salary: undefined,
    max_salary: undefined,
    location: "",
    expiry_date: "",
    work_type: "On Site",
    employment_type: "Part Time",
    status: "Open",
  });
  const southAfricanCities = [
    "Cape Town",
    "Durban",
    "Johannesburg",
    "Pretoria",
    "Port Elizabeth",
    "Bloemfontein",
    "East London",
    "Polokwane",
    "Nelspruit",
    "George",
    "Kimberley",
    "Pietermaritzburg",
    "Rustenburg",
    "Mthatha",
    "Vanderbijlpark",
    "Klerksdorp",
    "Secunda",
  ];

  useEffect(() => {
    if (error) {
      setErrors({
        general: error.details || "An error occurred. Please try again later.",
      });
      dispatch(clearError());
    }
  }, [error, dispatch]);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setJobPostData({ ...jobPostData, [id]: value });
  };

  const handleSkillChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedSkillId = e.target.value;
    if (!jobPostData.skills.includes(selectedSkillId)) {
      setJobPostData({
        ...jobPostData,
        skills: [...jobPostData.skills, selectedSkillId],
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setSuccessMessage(null);

    try {
      const updatedJobPostData = { ...jobPostData };

      if (showSalaryRange) {
        delete updatedJobPostData.fixed_salary;
      } else {
        delete updatedJobPostData.min_salary;
        delete updatedJobPostData.max_salary;
      }

      await createNewJobPost(updatedJobPostData);
    } catch (error: any) {
      setErrors({ general: error.message || "Failed to save job post." });
    }
  };

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   setErrors({});
  //   setSuccessMessage(null);

  //   try {
  //     await createNewJobPost();
  //   } catch (error: any) {
  //     setErrors({ general: error.message || "Failed to save job post." });
  //   }
  // };

  const createNewJobPost = async (updatedJobPostData: JobPost) => {
    const company: any = await dispatch(fetchEmployerCompany());
    updatedJobPostData.company = company?.payload?.data[0]?.id;
    const resultAction = await dispatch(createJobPost(updatedJobPostData));

    if (createJobPost.fulfilled.match(resultAction)) {
      setSuccessMessage("Job post created successfully.");
      setIsModalOpen(true);
    } else {
      const payload = resultAction.payload as any;
      setErrors(payload || { general: "Failed to create job post." });
    }
  };
  const removeSkill = (skillId: string) => {
    setJobPostData({
      ...jobPostData,
      skills: jobPostData.skills.filter((id) => id !== skillId),
    });
  };

  const handleLocationChange = (val: string) => {
    setJobPostData({ ...jobPostData, location: val });
  };

  useEffect(() => {
    const fetchSkills = async () => {
      const resp: any = await dispatch(getSkills());
      setSkills(resp.payload);
    };
    fetchSkills();

    const getCompany = async () => {
      const company: any = await dispatch(fetchEmployerCompany());
      setCompany(company.payload.data[0].id);
    };
    getCompany();
  }, [dispatch]);

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="mb-5 text-lg font-bold text-black">Job Post</h2>
      {successMessage && (
        <div className="mb-4 text-green-500">{successMessage}</div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <Label
            htmlFor="job_title"
            className="block text-sm font-medium text-gray-700"
          >
            Job Title
          </Label>
          <TextInput
            id="job_title"
            type="text"
            className="mt-1 w-full"
            value={jobPostData.job_title}
            onChange={handleInputChange}
          />
          {errors.job_title && (
            <p className="text-red-500">{errors.job_title}</p>
          )}
        </div>

        <div className="mb-4">
          <Label
            htmlFor="salary"
            className="block text-sm font-medium text-gray-700"
          >
            {showSalaryRange
              ? "Salary Range (Annually)"
              : "Fixed Salary (Annually)"}
          </Label>

          {showSalaryRange ? (
            <div className="flex gap-2">
              <TextInput
                id="min_salary"
                type="number"
                placeholder="Min"
                className="w-1/2"
                value={jobPostData.min_salary?.toString() || ""}
                onChange={handleInputChange}
              />
              <TextInput
                id="max_salary"
                type="number"
                placeholder="Max"
                className="w-1/2"
                value={jobPostData.max_salary?.toString() || ""}
                onChange={handleInputChange}
              />
            </div>
          ) : (
            <TextInput
              id="fixed_salary"
              type="number"
              placeholder="Fixed Salary"
              className="w-full"
              value={jobPostData.fixed_salary?.toString() || ""}
              onChange={handleInputChange}
            />
          )}

          <div className="flex items-center gap-2 mt-2">
            <Checkbox
              id="toggle_salary"
              checked={showSalaryRange}
              onChange={() => setShowSalaryRange(!showSalaryRange)}
            />
            <Label htmlFor="toggle_salary">
              {showSalaryRange
                ? "Switch to Fixed Salary"
                : "Switch to Salary Range"}
            </Label>
          </div>
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
            value={jobPostData.location}
            onChange={handleInputChange}
          >
            <option value="" disabled>
              Select a city
            </option>
            {southAfricanCities.map((city, index) => (
              <option key={index} value={city}>
                {city}
              </option>
            ))}
          </Select>
          {errors.location && <p className="text-red-500">{errors.location}</p>}
        </div>

        {/* <div className="mb-4">
          <Label
            htmlFor="location"
            className="block text-sm font-medium text-gray-700"
          >
            Location
          </Label>
          <CountryDropdown
            value={jobPostData.location}
            onChange={handleLocationChange}
            classes="form-control mt-1 w-full"
          />
          {errors.location && <p className="text-red-500">{errors.location}</p>}
        </div> */}

        <div className="mb-4">
          <Label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            Description
          </Label>
          <Textarea
            id="description"
            className="mt-1 w-full"
            value={jobPostData.description}
            onChange={handleInputChange}
            rows={4}
          />
          {errors.description && (
            <p className="text-red-500">{errors.description}</p>
          )}
        </div>

        <div className="mb-4">
          <Label
            htmlFor="responsibilities"
            className="block text-sm font-medium text-gray-700"
          >
            Responsibilities
          </Label>
          <Textarea
            id="responsibilities"
            className="mt-1 w-full"
            value={jobPostData.responsibilities}
            onChange={handleInputChange}
            rows={4}
          />
          {errors.responsibilities && (
            <p className="text-red-500">{errors.responsibilities}</p>
          )}
        </div>

        <div className="mb-4">
          <Label
            htmlFor="desirable_skills"
            className="block text-sm font-medium text-gray-700"
          >
            Desirable Skills
          </Label>
          <Textarea
            id="desirable_skills"
            className="mt-1 w-full"
            value={jobPostData?.desirable_skills}
            onChange={handleInputChange}
            rows={4}
          />
          {errors.desirable_skills && (
            <p className="text-red-500">{errors.desirable_skills}</p>
          )}
        </div>

        <div className="mb-4">
          <Label
            htmlFor="work_type"
            className="block text-sm font-medium text-gray-700"
          >
            Work Type
          </Label>
          <Select
            id="work_type"
            className="mt-1 w-full"
            value={jobPostData.work_type}
            onChange={handleInputChange}
          >
            <option value="Remote">Remote</option>
            <option value="On Site">On-site</option>
            <option value="Hybrid">Hybrid</option>
          </Select>
          {errors.work_type && (
            <p className="text-red-500">{errors.work_type}</p>
          )}
        </div>

        <div className="mb-4">
          <Label
            htmlFor="employment_type"
            className="block text-sm font-medium text-gray-700"
          >
            Employment Type
          </Label>
          <Select
            id="employment_type"
            className="mt-1 w-full"
            value={jobPostData.employment_type}
            onChange={handleInputChange}
          >
            <option value="Full Time">Full-time</option>
            <option value="Part Time">Part-time</option>
            <option value="Any">Any</option>
          </Select>
          {errors.employment_type && (
            <p className="text-red-500">{errors.employment_type}</p>
          )}
        </div>

        <div className="mb-4">
          <Label
            htmlFor="skills"
            className="block text-sm font-medium text-gray-700"
          >
            Skills
          </Label>
          <div className="flex flex-wrap gap-2 mb-2">
            {jobPostData.skills.map((skillId) => {
              const skill = skills.find((s) => s.id.toString() === skillId);
              return (
                skill && (
                  <div
                    key={skill.id}
                    className="flex items-center px-3 py-1 bg-gray-200 rounded-full"
                  >
                    <span className="mr-2">{skill.name}</span>
                    <button
                      type="button"
                      className="text-red-500"
                      onClick={() => removeSkill(skillId)}
                    >
                      &times;
                    </button>
                  </div>
                )
              );
            })}
          </div>
          <Select
            id="skills"
            className="mt-1 w-full"
            onChange={handleSkillChange}
            value=""
          >
            <option value="" disabled>
              Select a skill
            </option>
            {skills.length > 0 &&
              skills.map((skill) => (
                <option key={skill.id} value={skill.id.toString()}>
                  {skill.name} ({skill.sector.name})
                </option>
              ))}
          </Select>
          {errors.skills && <p className="text-red-500">{errors.skills}</p>}
        </div>

        <div className="mb-4">
          <Label
            htmlFor="expiry_date"
            className="block text-sm font-medium text-gray-700"
          >
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
          <Label
            htmlFor="status"
            className="block text-sm font-medium text-gray-700"
          >
            Status
          </Label>
          <Select
            id="status"
            className="mt-1 w-full"
            value={jobPostData.status}
            onChange={handleInputChange}
          >
            <option value="Open">Open</option>
            <option value="Closed">Closed</option>
            <option value="On Hold">On Hold</option>
          </Select>
          {errors.status && <p className="text-red-500">{errors.status}</p>}
        </div>

        <div className="flex justify-end">
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
      </form>

      {isModalOpen && (
        <Modal show={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <Modal.Header>Success</Modal.Header>
          <Modal.Body>
            <p>{successMessage}</p>
          </Modal.Body>
          <Modal.Footer>
            <Button
              color="success"
              onClick={() => {
                setIsModalOpen(false);
                setTimeout(() => {
                  router.push("/dashboard");
                }, 300);
              }}
            >
              Go to Job Posts
            </Button>
            <Button color="gray" onClick={() => setIsModalOpen(false)}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
};

export default JobPostForm;
