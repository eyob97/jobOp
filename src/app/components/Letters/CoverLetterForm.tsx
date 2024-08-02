"use client";

import React, { useState, useEffect, useRef } from "react";
import { Label, TextInput, Button, Card, Spinner, Alert } from "flowbite-react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/app/redux/store";
import {
  fetchFiles,
  generateCoverLetterAPI,
  saveAndApplyAPI,
} from "@/app/redux/letterSlice";

interface CoverLetterFormProps {
  onViewLetter: () => void;
}

const CoverLetterForm: React.FC<CoverLetterFormProps> = ({ onViewLetter }) => {
  const [formData, setFormData] = useState({
    full_name: "",
    contact_info: "",
    recipient_name: "",
    company_name: "",
    interest_reason: "",
    relevant_experience: "",
    top_skills: [] as string[],
    major_accomplishment: "",
    relevant_project: "",
    unique_qualities: "",
  });

  const dispatch = useDispatch<AppDispatch>();
  const { generatedCoverLetter, files } = useSelector(
    (state: RootState) => state.letters.coverLetter
  );
  const [editableContent, setEditableContent] = useState("");
  const editableRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [skillError, setSkillError] = useState<string | null>(null);

  useEffect(() => {
    setEditableContent(generatedCoverLetter?.cover_letter || "");
  }, [generatedCoverLetter]);

  useEffect(() => {
    dispatch(fetchFiles());
  }, [dispatch]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };
  function debounce(func: (...args: any[]) => void, wait: number) {
    let timeout: NodeJS.Timeout;
    return (...args: any[]) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), wait);
    };
  }
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const newSkill = (e.target as HTMLInputElement).value.trim();
      if (
        newSkill &&
        newSkill.length <= 10 &&
        formData.top_skills.length < 3 &&
        !formData.top_skills.includes(newSkill)
      ) {
        setFormData((prevData) => ({
          ...prevData,
          top_skills: [...prevData.top_skills, newSkill],
        }));
        (e.target as HTMLInputElement).value = "";
        setSkillError(null);
      } else if (formData.top_skills.length >= 3) {
        setSkillError("You can only add up to 3 skills.");
      } else if (formData.top_skills.includes(newSkill)) {
        setSkillError("Skill already added.");
      }
    }
  };

  const handleSkillRemove = (skill: string) => {
    setFormData((prevData) => ({
      ...prevData,
      top_skills: prevData.top_skills.filter((s) => s !== skill),
    }));
    setSkillError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.top_skills.length < 3) {
      setSkillError("Please add at least 3 skills.");
      return;
    }
    setIsLoading(true);
    setError(null);
    try {
      await dispatch(generateCoverLetterAPI(formData)).unwrap();
    } catch (err) {
      setError("Failed to generate cover letter. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const debouncedHandleEditableChange = useRef(
    debounce((content: string) => {
      setEditableContent(content);
    }, 300)
  ).current;

  const handleEditableChange = (e: React.FormEvent<HTMLDivElement>) => {
    debouncedHandleEditableChange(e.currentTarget.innerHTML);
  };

  const handleSaveAndApply = async (fileId: number) => {
    try {
      const form = new FormData();
      form.append("file_name", `${formData.company_name} Cover Letter`);
      form.append("file_type", "Cover Letter");
      form.append("details", editableContent);

      await dispatch(saveAndApplyAPI({ id: fileId, formData: form })).unwrap();
      onViewLetter();
    } catch (err) {
      setError("Failed to update cover letter. Please try again.");
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 h-screen">
      <div className="flex flex-col justify-start p-6 md:p-8 overflow-auto bg-white">
        <h2 className="text-4xl font-bold mb-2">
          {`Title of Cover Letter for ${formData.company_name}`}
        </h2>
        <p className="text-base font-normal text-gray-500 mb-4">
          Please, provide us with some answers to generate a perfect prompt for
          your cover letter
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <Label
              htmlFor="full_name"
              className="font-bold text-gray-700 mb-2 block"
            >
              What is your full name?
            </Label>
            <TextInput
              id="full_name"
              type="text"
              value={formData.full_name}
              onChange={handleInputChange}
              className="w-full bg-white rounded-2xl border-gray-300"
              required
            />
          </div>
          <div>
            <Label
              htmlFor="contact_info"
              className="font-bold text-gray-700 mb-2 block"
            >
              What is your email address for contact purposes?
            </Label>
            <TextInput
              id="contact_info"
              type="email"
              value={formData.contact_info}
              onChange={handleInputChange}
              className="w-full bg-white rounded-2xl border-gray-300"
              required
            />
          </div>
          <div>
            <Label
              htmlFor="recipient_name"
              className="font-bold text-gray-700 mb-2 block"
            >
              What is the name of the person you are addressing the cover letter
              to?
            </Label>
            <TextInput
              id="recipient_name"
              type="text"
              value={formData.recipient_name}
              onChange={handleInputChange}
              className="w-full bg-white rounded-2xl border-gray-300"
              required
            />
          </div>
          <div>
            <Label
              htmlFor="company_name"
              className="font-bold text-gray-700 mb-2 block"
            >
              What is the name of the company you are applying to?
            </Label>
            <TextInput
              id="company_name"
              type="text"
              value={formData.company_name}
              onChange={handleInputChange}
              className="w-full bg-white rounded-2xl border-gray-300"
              required
            />
          </div>
          <div>
            <Label
              htmlFor="interest_reason"
              className="font-bold text-gray-700 mb-2 block"
            >
              Why are you interested in working for this company?
            </Label>
            <TextInput
              id="interest_reason"
              type="text"
              value={formData.interest_reason}
              onChange={handleInputChange}
              className="w-full bg-white rounded-2xl border-gray-300"
              required
            />
          </div>
          <div>
            <Label
              htmlFor="relevant_experience"
              className="font-bold text-gray-700 mb-2 block"
            >
              Can you describe your relevant experience for this position?
            </Label>
            <TextInput
              id="relevant_experience"
              type="text"
              value={formData.relevant_experience}
              onChange={handleInputChange}
              className="w-full bg-white rounded-2xl border-gray-300"
              required
            />
          </div>
          <div>
            <Label
              htmlFor="top_skills"
              className="font-bold text-gray-700 mb-2 block"
            >
              Top Skills (max 3)
            </Label>
            <TextInput
              id="top_skills"
              type="text"
              onKeyDown={handleKeyDown}
              className="w-full bg-white rounded-2xl border-gray-300"
              placeholder="Enter skill and press Enter"
            />
            {skillError && <p className="text-red-500 text-sm">{skillError}</p>}
            <div className="flex flex-wrap gap-2 mt-2">
              {formData.top_skills.map((skill, index) => (
                <div
                  key={index}
                  className="bg-green-500 text-white px-2 py-1 rounded-full flex items-center"
                >
                  <span>{skill}</span>
                  <button
                    type="button"
                    className="ml-2 text-xs"
                    onClick={() => handleSkillRemove(skill)}
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          </div>
          <div>
            <Label
              htmlFor="major_accomplishment"
              className="font-bold text-gray-700 mb-2 block"
            >
              Describe a major accomplishment or responsibility from your
              previous role
            </Label>
            <TextInput
              id="major_accomplishment"
              type="text"
              value={formData.major_accomplishment}
              onChange={handleInputChange}
              className="w-full bg-white rounded-2xl border-gray-300"
              required
            />
          </div>
          <div>
            <Label
              htmlFor="relevant_project"
              className="font-bold text-gray-700 mb-2 block"
            >
              Describe a specific project or task you worked on that is relevant
              to this job
            </Label>
            <TextInput
              id="relevant_project"
              type="text"
              value={formData.relevant_project}
              onChange={handleInputChange}
              className="w-full bg-white rounded-2xl border-gray-300"
              required
            />
          </div>
          <div>
            <Label
              htmlFor="unique_qualities"
              className="font-bold text-gray-700 mb-2 block"
            >
              What sets you apart as a candidate for this position?
            </Label>
            <TextInput
              id="unique_qualities"
              type="text"
              value={formData.unique_qualities}
              onChange={handleInputChange}
              className="w-full bg-white rounded-2xl border-gray-300"
              required
            />
          </div>
          <Button
            type="submit"
            className="w-full rounded-full text-black"
            style={{ backgroundColor: "#FFC424", color: "#000" }}
          >
            {isLoading ? <Spinner aria-label="Loading" /> : "Generate"}
          </Button>
          {error && (
            <Alert color="failure" withBorderAccent>
              {error}
            </Alert>
          )}
        </form>
      </div>
      <div className="flex flex-col items-start justify-center w-full bg-[rgba(35,149,85,0.19)] p-4 md:p-8">
        <Card className="w-full max-w-2xl bg-white shadow-md rounded-2xl">
          <h2 className="text-4xl font-bold mb-2">
            {`Cover Letter for ${formData.company_name}`}
          </h2>
          <div
            contentEditable
            suppressContentEditableWarning
            onInput={handleEditableChange}
            ref={editableRef}
            className="whitespace-pre-wrap p-4 border border-gray-300 rounded-lg focus:border-green-500 focus:outline-none focus:shadow-outline-green"
            style={{ minHeight: "200px" }}
          >
            {editableContent}
          </div>
          <div className="flex justify-between mt-4 border-t border-gray-200 pt-4">
            <span>E: {formData.contact_info}</span>
          </div>
        </Card>
        {generatedCoverLetter && (
          <div className="mt-4 flex gap-4">
            <Button
              onClick={() => handleSaveAndApply(files[0]?.id)}
              className="bg-green-500 text-white rounded-full px-4 py-2"
            >
              Save and Apply
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CoverLetterForm;
