"use client";

import React, { useState, useEffect, useRef } from "react";
import { Label, TextInput, Button, Card, Spinner, Alert } from "flowbite-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/app/redux/store";
import {
  fetchFiles,
  generateMotivationLetterAPI,
  saveAndApplyAPI,
} from "@/app/redux/letterSlice";

interface MotivationLetterFormProps {
  onViewLetter: () => void;
}

const MotivationLetterForm: React.FC<MotivationLetterFormProps> = ({ onViewLetter }) => {
  const [formData, setFormData] = useState({
    name: "",
    current_job_title: "",
    position_applied_for: "",
    job_attract_aspects: "",
    specific_skills: "",
    unique_skills: "",
    company_mission_and_values: "",
    long_term_career_aspirations: "",
    availability_start_date: new Date(),
  });


  const dispatch = useDispatch<AppDispatch>();
  const { generatedMotivationLetter, files } = useSelector(
    (state: RootState) => state.letters.motivationLetter
  );
  const [editableContent, setEditableContent] = useState("");
  const editableRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setEditableContent(generatedMotivationLetter?.motivation_letter || "");
  }, [generatedMotivationLetter]);

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

  const handleDateChange = (date: Date | null) => {
    if (date) {
      setFormData((prevData) => ({
        ...prevData,
        availability_start_date: date,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      const formattedData = {
        ...formData,
        availability_start_date: formData.availability_start_date
          .toISOString()
          .split("T")[0],
      };
      await dispatch(generateMotivationLetterAPI(formattedData)).unwrap();
    } catch (err: any) {
      setError("Failed to generate motivation letter. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditableChange = (e: React.FormEvent<HTMLDivElement>) => {
    setEditableContent(e.currentTarget.innerHTML);
  };


  const handleSaveAndApply = async (fileId: number) => {
    try {
      const form = new FormData();
      form.append("file_name", `${formData.current_job_title} Cover Letter`);
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
          {`Title of Motivation Letter for ${formData.position_applied_for}`}
        </h2>
        <p className="text-base font-normal text-gray-500 mb-4">
          Please, provide us with some answers to generate a perfect prompt for
          your motivation letter
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <Label
              htmlFor="name"
              className="font-bold text-gray-700 mb-2 block"
            >
              What is your full name?
            </Label>
            <TextInput
              id="name"
              type="text"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full bg-white rounded-2xl border-gray-300"
              required
            />
          </div>
          <div>
            <Label
              htmlFor="current_job_title"
              className="font-bold text-gray-700 mb-2 block"
            >
              What is your current job title?
            </Label>
            <TextInput
              id="current_job_title"
              type="text"
              value={formData.current_job_title}
              onChange={handleInputChange}
              className="w-full bg-white rounded-2xl border-gray-300"
              required
            />
          </div>
          <div>
            <Label
              htmlFor="position_applied_for"
              className="font-bold text-gray-700 mb-2 block"
            >
              What position are you applying for?
            </Label>
            <TextInput
              id="position_applied_for"
              type="text"
              value={formData.position_applied_for}
              onChange={handleInputChange}
              className="w-full bg-white rounded-2xl border-gray-300"
              required
            />
          </div>
          <div>
            <Label
              htmlFor="job_attract_aspects"
              className="font-bold text-gray-700 mb-2 block"
            >
              What aspects of the job attract you the most?
            </Label>
            <TextInput
              id="job_attract_aspects"
              type="text"
              value={formData.job_attract_aspects}
              onChange={handleInputChange}
              className="w-full bg-white rounded-2xl border-gray-300"
              required
            />
          </div>
          <div>
            <Label
              htmlFor="specific_skills"
              className="font-bold text-gray-700 mb-2 block"
            >
              What specific skills make you a good fit for this role?
            </Label>
            <TextInput
              id="specific_skills"
              type="text"
              value={formData.specific_skills}
              onChange={handleInputChange}
              className="w-full bg-white rounded-2xl border-gray-300"
              required
            />
          </div>
          <div>
            <Label
              htmlFor="unique_skills"
              className="font-bold text-gray-700 mb-2 block"
            >
              What unique skills do you possess that others might not?
            </Label>
            <TextInput
              id="unique_skills"
              type="text"
              value={formData.unique_skills}
              onChange={handleInputChange}
              className="w-full bg-white rounded-2xl border-gray-300"
              required
            />
          </div>
          <div>
            <Label
              htmlFor="company_mission_and_values"
              className="font-bold text-gray-700 mb-2 block"
            >
              What do you know about the company’s mission and values?
            </Label>
            <TextInput
              id="company_mission_and_values"
              type="text"
              value={formData.company_mission_and_values}
              onChange={handleInputChange}
              className="w-full bg-white rounded-2xl border-gray-300"
              required
            />
          </div>
          <div>
            <Label
              htmlFor="long_term_career_aspirations"
              className="font-bold text-gray-700 mb-2 block"
            >
              What are your long-term career aspirations?
            </Label>
            <TextInput
              id="long_term_career_aspirations"
              type="text"
              value={formData.long_term_career_aspirations}
              onChange={handleInputChange}
              className="w-full bg-white rounded-2xl border-gray-300"
              required
            />
          </div>
          <div>
            <Label
              htmlFor="availability_start_date"
              className="font-bold text-gray-700 mb-2 block"
            >
              When are you available to start working?
            </Label>
            <DatePicker
              id="availability_start_date"
              selected={formData.availability_start_date}
              onChange={handleDateChange}
              dateFormat="yyyy-MM-dd"
              className="w-full bg-white rounded-2xl border-gray-300"
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
            <Alert color="failure" className="mt-4">
              {error}
            </Alert>
          )}
        </form>
      </div>
      <div className="flex flex-col items-start justify-center w-full bg-[rgba(35,149,85,0.19)] p-4 md:p-8">
        <Card className="w-full max-w-2xl bg-white shadow-md rounded-2xl">
          <h2 className="text-4xl font-bold mb-2">
            {`Motivation Letter for ${formData.position_applied_for}`}
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
        </Card>
        {generatedMotivationLetter && (
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

export default MotivationLetterForm;
