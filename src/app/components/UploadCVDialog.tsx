"use client";

import React, { ChangeEvent, useState, useRef, useCallback, useEffect } from "react";
import { Button, Card, Label } from "flowbite-react";
import { HiDocumentText, HiPencil } from "react-icons/hi";
import JobSeekerProfileForm from "./JobSeekerProfileForm";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export function UploadCVCard() {
  const [view, setView] = useState("initial");
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [jobSeekerData, setJobSeekerData] = useState<any>(null);
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    // Fetch initial data when the component mounts
    fetchJobSeekerData();
  }, []);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.files ? e.target.files[0] : null);
  };

  const handleDrop = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    const file = event.dataTransfer.files[0];
    setFile(file);
  }, []);

  const handleDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
  }, []);

  const handleUpload = async () => {
    if (!file) {
      setError("Please select a file to upload.");
      toast.error("Please select a file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      console.log("Uploading file...");
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/cv-extraction/upload-pdf/`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        console.log("File uploaded successfully:", response.data);
        fetchJobSeekerData();
        toast.success("Your CV was successfully uploaded.");
      } else {
        setError("Failed to upload file.");
        toast.error("Failed to upload file.");
        console.error("Failed to upload file:", response.status, response.statusText);
      }
    } catch (error) {
      setError("An error occurred while uploading the file.");
      toast.error("An error occurred while uploading the file.");
      console.error("Error uploading file:", error);
    }
  };

  const fetchJobSeekerData = async () => {
    try {
      console.log("Fetching job seeker data...");
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/job-seeker/`);

      if (response.status === 200) {
        setJobSeekerData(response.data);
        toast.success("Job seeker data fetched successfully.");
      } else {
        setError("Failed to fetch job seeker data.");
        toast.error("Failed to fetch job seeker data.");
        console.error("Failed to fetch job seeker data:", response.status, response.statusText);
      }
    } catch (error) {
      setError("An error occurred while fetching job seeker data.");
      toast.error("An error occurred while fetching job seeker data.");
      console.error("Error fetching job seeker data:", error);
    }
  };

  const renderInitialView = () => (
    <div className="text-center">
      <h2 className="mb-5 text-lg font-bold text-black">Let's start</h2>
      <h2 className="mb-5 text-lg font-normal text-black">
        You can upload an existing CV and edit it later or create a new one from scratch
      </h2>
      <div className="flex justify-center gap-4">
        <Button
          color="text"
          className="flex flex-col items-center p-4 border border-gray-300 dark:border-gray-600 rounded-lg"
          onClick={() => setView("upload")}
        >
          <HiDocumentText className="mb-2 h-6 w-6 text-gray-500 dark:text-gray-400" />
          <span>Upload CV</span>
        </Button>
        <Button
          color="text"
          className="flex flex-col items-center p-4 border border-gray-300 dark:border-gray-600 rounded-lg"
          onClick={() => setView("create")}
        >
          <HiPencil className="mb-2 h-6 w-6 text-gray-500 dark:text-gray-400" />
          <span>Create CV</span>
        </Button>
      </div>
    </div>
  );

  const renderUploadView = () => (
    <div className="text-center">
      <h2 className="mb-5 text-lg font-bold text-black">Upload Resume</h2>
      <div
        className="border-dashed border-2 border-gray-400 p-4 rounded-lg text-center"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        <input type="file" onChange={handleFileChange} className="mb-2" />
        <p className="text-sm text-gray-500">Supported types: .PDF, .DOCX</p>
        <p className="text-sm text-gray-500">Max. Size: 300MB</p>
      </div>
      {error && <p className="text-red-500 mt-2">{error}</p>}
      <div className="flex justify-end mt-4">
        <Button
          color="text"
          className="w-full rounded-full text-black"
          style={{ backgroundColor: "#000", color: "#fff" }}
          onClick={handleUpload}
        >
          Upload
        </Button>
        <Button
          color="text"
          className="w-full rounded-full text-black ml-2"
          style={{ backgroundColor: "#000", color: "#fff" }}
          onClick={() => setView("initial")}
        >
          Back
        </Button>
      </div>
    </div>
  );

  const renderCreateView = () => (
    <div>
      <JobSeekerProfileForm setView={setView} initialData={jobSeekerData} />
    </div>
  );

  const renderProfileView = () => (
    <div>
      <JobSeekerProfileForm setView={setView} initialData={jobSeekerData} />
    </div>
  );

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl p-6 bg-white shadow-md rounded-lg">
        {view === "initial" && renderInitialView()}
        {view === "upload" && renderUploadView()}
        {view === "create" && renderCreateView()}
        {view === "profile" && renderProfileView()}
      </Card>
    </div>
  );
}
