"use client";

import { useState, ChangeEvent, useEffect } from "react";
import { Button, Label, TextInput } from "flowbite-react";
import { CountryDropdown } from "react-country-region-selector";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { clearError, createJobSeekerProfile, fetchJobSeekerData, updateProfile } from "../redux/resumeSlice";

interface EmploymentHistory {
  company_name: string;
  job_title: string;
  start_date: string;
  end_date: string | null;
}

interface JobSeekerProfile {
  address: string | null;
  profile_description: string | null;
  current_work_status: string;
  work_status: string;
  open_to_work: boolean;
  cv_text: string | null;
  status: string;
  subscription_status: string;
  subscription_date: string | null;
  full_name: string;
  email: string;
  age: number | null;
  gender: string;
  location: string;
  worked_industries: string;
  skills: string;
  experience: string;
  qualifications: string | null;
  education: string;
  employment_history: EmploymentHistory[];
}

interface JobSeekerProfileFormProps {
  setView: (view: string) => void;
}

const JobSeekerProfileForm: React.FC<JobSeekerProfileFormProps> = ({
  setView,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const { error, jobSeekerData } = useSelector(
    (state: RootState) => state.resume
  );
  const { user } = useSelector((state: RootState) => state.auth);
  const [errors, setErrors] = useState<Record<string, string[] | string>>({});

  const [profileData, setProfileData] = useState<JobSeekerProfile>({
    address: "",
    profile_description: "",
    current_work_status: "",
    work_status: "Full Time",
    open_to_work: false,
    cv_text: null,
    status: "pending",
    subscription_status: "pending",
    subscription_date: null,
    full_name: "",
    email: "",
    age: null,
    gender: "",
    location: "",
    worked_industries: "",
    skills: "",
    experience: "",
    qualifications: null,
    education: "",
    employment_history: [
      {
        company_name: "",
        job_title: "",
        start_date: "",
        end_date: null,
      },
    ],
  });

  useEffect(() => {
    dispatch(fetchJobSeekerData());
  }, [dispatch]);

  useEffect(() => {
    if (jobSeekerData) {

      if (Array.isArray(jobSeekerData) && jobSeekerData.length > 0) {
        const data = jobSeekerData[0];
        setProfileData({
          address: data.address || "",
          profile_description: data.profile_description || "",
          current_work_status: data.current_work_status || "",
          work_status: data.work_status || "Full Time",
          open_to_work: data.open_to_work || false,
          cv_text: data.cv_text || null,
          status: data.status || "pending",
          subscription_status: data.subscription_status || "pending",
          subscription_date: data.subscription_date || null,
          full_name: data.full_name || "",
          email: data.email || "",
          age: data.age || null,
          gender: data.gender || "",
          location: data.location || "",
          worked_industries: data.worked_industries || "",
          skills: data.skills || "",
          experience: data.experience || "",
          qualifications: data.qualifications || null,
          education: data.education || "",
          employment_history:
            data.employment_history?.length > 0
              ? data.employment_history.map((job: any) => ({
                  company_name: job.company_name || "",
                  job_title: job.job_title || "",
                  start_date: job.start_date || "",
                  end_date: job.end_date || null,
                }))
              : [
                  {
                    company_name: "",
                    job_title: "",
                    start_date: "",
                    end_date: null,
                  },
                ],
        });
      } else {
        console.error(
          "jobSeekerData is not an array or is empty:",
          jobSeekerData
        );
      }
    }
  }, [jobSeekerData]);

  useEffect(() => {
    if (error) {
      setErrors(error);
      dispatch(clearError());
    }
  }, [error, dispatch]);

  const handleAddJob = () => {
    const updatedHistory = [
      ...profileData.employment_history,
      {
        company_name: "",
        job_title: "",
        start_date: "",
        end_date: null,
      },
    ];
    setProfileData({ ...profileData, employment_history: updatedHistory });
  };

  const handleRemoveJob = (index: number) => {
    const updatedHistory = profileData.employment_history.filter(
      (_, i) => i !== index
    );
    setProfileData({ ...profileData, employment_history: updatedHistory });
  };

  const handleChange = (
    index: number,
    field: keyof EmploymentHistory,
    value: string
  ) => {
    const updatedHistory = [...profileData.employment_history];
    updatedHistory[index][field] = value;
    setProfileData({ ...profileData, employment_history: updatedHistory });
  };

  const handleProfileChange = (
    e:
      | ChangeEvent<HTMLInputElement | HTMLSelectElement>
      | { target: { id: string; value: string } }
  ) => {
    const { id, value } = e.target;
    setProfileData({ ...profileData, [id]: value });
  };

  const handleLocationChange = (val: string) => {
    setProfileData({ ...profileData, location: val });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
  
    try {
      if (jobSeekerData && jobSeekerData.length > 0) {
        const jobSeekerId = jobSeekerData[0].id; 
  
        const resultAction = await dispatch(
          updateProfile({
            id: jobSeekerId,
            profileData,
            employmentHistory: profileData.employment_history,
          })
        );
  
        if (updateProfile.fulfilled.match(resultAction)) {
          // router.push("/pages/upload-cv"); 
        } else {
          const payload = resultAction.payload as any;
          setErrors(payload || { general: "Failed to update profile." });
        }
      } else {
        const createProfileResult = await dispatch(
          createJobSeekerProfile(profileData)
        );
  
        if (createJobSeekerProfile.fulfilled.match(createProfileResult)) {

          const jobSeekerId = createProfileResult.payload.id;
  
          const resultAction = await dispatch(
            updateProfile({
              id: jobSeekerId,
              profileData,
              employmentHistory: profileData.employment_history,
            })
          );
  
          if (updateProfile.fulfilled.match(resultAction)) {
            return null;
            // router.push("/pages/upload-cv"); 
          } else {
            const payload = resultAction.payload as any;
            setErrors(payload || { general: "Failed to update profile." });
          }
        } else {
          const payload = createProfileResult.payload as any;
          setErrors(payload || { general: "Failed to create profile." });
        }
      }
    } catch (error: any) {
      setErrors({ general: error.message || "Failed to save profile." });
    }
  };
  

  return (
    <div>
      <h2 className="mb-5 text-lg font-bold text-black">Job Seeker Profile</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <Label
            htmlFor="full_name"
            className="block text-sm font-medium text-gray-700"
          >
            Full Name
          </Label>
          <TextInput
            id="full_name"
            type="text"
            className="mt-1 w-full"
            value={profileData.full_name}
            onChange={handleProfileChange}
          />
          {errors.full_name && (
            <p className="text-red-500">{errors.full_name}</p>
          )}
        </div>
        <div className="mb-4">
          <Label
            htmlFor="current_work_status"
            className="block text-sm font-medium text-gray-700"
          >
            Job Title
          </Label>
          <TextInput
            id="current_work_status"
            type="text"
            className="mt-1 w-full"
            value={profileData.current_work_status}
            onChange={handleProfileChange}
          />
          {errors.current_work_status && (
            <p className="text-red-500">{errors.current_work_status}</p>
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
            value={profileData.location}
            onChange={(val) => handleLocationChange(val)}
            classes="form-control mt-1 w-full"
          />
          {errors.location && <p className="text-red-500">{errors.location}</p>}
        </div>
        <div className="mb-4">
          <Label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </Label>
          <TextInput
            id="email"
            type="email"
            className="mt-1 w-full"
            value={profileData.email}
            onChange={handleProfileChange}
          />
          {errors.email && <p className="text-red-500">{errors.email}</p>}
        </div>
        <div className="mb-4">
          <Label
            htmlFor="age"
            className="block text-sm font-medium text-gray-700"
          >
            Age
          </Label>
          <TextInput
            id="age"
            type="number"
            className="mt-1 w-full"
            value={profileData.age?.toString() || ""}
            onChange={handleProfileChange}
          />
          {errors.age && <p className="text-red-500">{errors.age}</p>}
        </div>
        <div className="mb-4">
          <Label
            htmlFor="gender"
            className="block text-sm font-medium text-gray-700"
          >
            Gender
          </Label>
          <Select
            id="gender"
            className="mt-1 w-full"
            value={{ value: profileData.gender, label: profileData.gender }}
            options={[
              { value: "Male", label: "Male" },
              { value: "Female", label: "Female" },
              { value: "Other", label: "Other" },
            ]}
            onChange={(selectedOption) =>
              handleProfileChange({
                target: { id: "gender", value: selectedOption?.value || "" },
              })
            }
          />
          {errors.gender && <p className="text-red-500">{errors.gender}</p>}
        </div>
        <div className="mb-4">
          <Label
            htmlFor="profile_description"
            className="block text-sm font-medium text-gray-700"
          >
            Profile Description
          </Label>
          <TextInput
            id="profile_description"
            type="text"
            className="mt-1 w-full"
            value={profileData.profile_description || ""}
            onChange={handleProfileChange}
          />
          {errors.profile_description && (
            <p className="text-red-500">{errors.profile_description}</p>
          )}
        </div>
        <div className="mb-4">
          <Label className="block text-sm font-medium text-gray-700">
            Preferences
          </Label>
          <div className="flex gap-4">
            <div className="flex items-center">
              <input
                type="radio"
                id="Full Time"
                name="preference"
                value="Full Time"
                className="mr-2"
                checked={profileData.work_status === "Full Time"}
                onChange={handleProfileChange}
              />
              <Label htmlFor="Full Time">Full Time</Label>
            </div>
            <div className="flex items-center">
              <input
                type="radio"
                id="part-time"
                name="preference"
                value="part-time"
                className="mr-2"
                checked={profileData.work_status === "part-time"}
                onChange={handleProfileChange}
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
                checked={profileData.work_status === "any"}
                onChange={handleProfileChange}
              />
              <Label htmlFor="any">Any</Label>
            </div>
          </div>
          {errors.work_status && (
            <p className="text-red-500">{errors.work_status}</p>
          )}
        </div>
        <h3 className="mb-5 text-lg font-bold text-black">
          Employment History
        </h3>
        {profileData.employment_history.map((job, index) => (
          <div key={index} className="mb-4 border-b pb-4">
            <div className="mb-4">
              <Label
                htmlFor={`company_name-${index}`}
                className="block text-sm font-medium text-gray-700"
              >
                Company Name
              </Label>
              <TextInput
                id={`company_name-${index}`}
                type="text"
                className="mt-1 w-full"
                value={job.company_name}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  handleChange(index, "company_name", e.target.value)
                }
              />
              {errors[`employment_history[${index}].company_name`] && (
                <p className="text-red-500">
                  {errors[`employment_history[${index}].company_name`]}
                </p>
              )}
            </div>
            <div className="mb-4">
              <Label
                htmlFor={`job_title-${index}`}
                className="block text-sm font-medium text-gray-700"
              >
                Job Title
              </Label>
              <TextInput
                id={`job_title-${index}`}
                type="text"
                className="mt-1 w-full"
                value={job.job_title}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  handleChange(index, "job_title", e.target.value)
                }
              />
              {errors[`employment_history[${index}].job_title`] && (
                <p className="text-red-500">
                  {errors[`employment_history[${index}].job_title`]}
                </p>
              )}
            </div>
            <div className="mb-4">
              <Label
                htmlFor={`start_date-${index}`}
                className="block text-sm font-medium text-gray-700"
              >
                Start Date
              </Label>
              <TextInput
                id={`start_date-${index}`}
                type="date"
                className="mt-1 w-full"
                value={job.start_date}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  handleChange(index, "start_date", e.target.value)
                }
              />
              {errors[`employment_history[${index}].start_date`] && (
                <p className="text-red-500">
                  {errors[`employment_history[${index}].start_date`]}
                </p>
              )}
            </div>
            <div className="mb-4">
              <Label
                htmlFor={`end_date-${index}`}
                className="block text-sm font-medium text-gray-700"
              >
                End Date
              </Label>
              <TextInput
                id={`end_date-${index}`}
                type="date"
                className="mt-1 w-full"
                value={job.end_date || ""}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  handleChange(index, "end_date", e.target.value)
                }
              />
              {errors[`employment_history[${index}].end_date`] && (
                <p className="text-red-500">
                  {errors[`employment_history[${index}].end_date`]}
                </p>
              )}
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
                value={job.job_title || ""}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  handleChange(index, "job_title", e.target.value)
                }
              />
              {errors[`employment_history[${index}].description`] && (
                <p className="text-red-500">
                  {errors[`employment_history[${index}].description`]}
                </p>
              )}
            </div>
            {profileData.employment_history.length > 1 && (
              <Button
                type="button"
                color="text-black"
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
            {jobSeekerData ? "Update" : "Save"}
          </Button>
        </div>
        {errors.general && (
          <p className="text-red-500 mt-2">{errors.general}</p>
        )}
      </form>
    </div>
  );
};

export default JobSeekerProfileForm;
