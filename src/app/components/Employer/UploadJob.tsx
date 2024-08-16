"use client";

import React, {
  ChangeEvent,
  useEffect,
  useRef,
  useState,
  useCallback,
} from "react";
import { Button, Card } from "flowbite-react";
import { HiDocumentText, HiPencil } from "react-icons/hi";
import JobPostForm from "./JobPostForm";
import { useDispatch, useSelector } from "react-redux";
import {
  setFile,
  uploadResume,
  fetchJobSeekerData,
  clearError,
  uploadJob,
} from "@/app/redux/resumeSlice";
import { RootState, AppDispatch } from "@/app/redux/store";

interface FormErrors {
  general?: string;
  file?: string;
}

export function UploadJobCard() {
  const [view, setView] = useState("initial");
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [errors, setErrors] = useState<FormErrors>({});
  const dispatch = useDispatch<AppDispatch>();
  const [extractedJob, setExtractedJob] = useState();
  const { job_post_file, jobSeekerData, isLoading, error } = useSelector(
    (state: RootState) => state.resume
  );
  const { token } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (token) {
      dispatch(fetchJobSeekerData());
    }
  }, [dispatch, token]);

  useEffect(() => {
    if (error) {
      if (
        error.details === "A Job Seeker profile already exists for this user."
      ) {
        setView("profileExists");
      } else {
        setErrors({
          general:
            error.details || "An error occurred. Please try again later.",
        });
      }
      dispatch(clearError());
    }
  }, [error, dispatch]);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      if (file.type !== "application/pdf") {
        setErrors({ file: "Only PDF files are allowed." });
        return;
      }
      setErrors({});
      setSelectedFile(file);
      dispatch(
        setFile({
          name: file.name,
          size: file.size,
          type: file.type,
          lastModified: file.lastModified,
        })
      );
    }
  };

  const handleDrop = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      event.stopPropagation();
      const file = event.dataTransfer.files[0];
      if (file) {
        if (file.type !== "application/pdf") {
          setErrors({ file: "Only PDF files are allowed." });
          return;
        }
        setErrors({});
        setSelectedFile(file);
        dispatch(
          setFile({
            name: file.name,
            size: file.size,
            type: file.type,
            lastModified: file.lastModified,
          })
        );
      }
    },
    [dispatch]
  );

  const handleDragOver = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      event.stopPropagation();
    },
    []
  );

  const handleUpload = async () => {
    if (!selectedFile) {
      setErrors({ file: "Please select a file to upload." });
      return;
    }

    const resultAction = await dispatch(uploadJob(selectedFile));

    if (uploadJob.fulfilled.match(resultAction)) {
      setExtractedJob(resultAction?.payload?.data);
      dispatch(fetchJobSeekerData());
      setView("create");
    } else {
      const payload = resultAction.payload as any;
      if (payload && payload.details) {
        setErrors({ general: payload.details });
      } else {
        setErrors({ general: "Failed to upload the resume." });
      }
    }
  };

  const renderInitialView = () => (
    <div className="text-center">
      <h2 className="mb-5 text-lg font-bold text-black">Let's start</h2>
      <h2 className="mb-5 text-lg font-normal text-black">
        You can upload existed PDF Job Post and edit it later or create new one
        from scratch
      </h2>
      <div className="flex justify-center gap-4">
        <Button
          color="text"
          className="flex flex-col items-center p-4 border border-gray-300 dark:border-gray-600 rounded-lg"
          onClick={() => setView("upload")}
        >
          <HiDocumentText className="mb-2 h-6 w-6 text-gray-500 dark:text-gray-400" />
          <span>Upload PDF</span>
        </Button>
        <Button
          color="text"
          className="flex flex-col items-center p-4 border border-gray-300 dark:border-gray-600 rounded-lg"
          onClick={() => {
            dispatch(fetchJobSeekerData());
            setView("create");
          }}
        >
          <HiPencil className="mb-2 h-6 w-6 text-gray-500 dark:text-gray-400" />
          <span>Create Job Post</span>
        </Button>
      </div>
    </div>
  );

  const renderUploadView = () => (
    <div className="text-center">
      <h2 className="mb-5 text-lg font-bold text-black">Upload Job</h2>
      <div
        className="border-dashed border-2 border-gray-400 p-4 rounded-lg text-center"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        <input
          type="file"
          onChange={handleFileChange}
          className="mb-2"
          ref={fileInputRef}
        />
        <p className="text-sm text-gray-500">Supported types: .PDF</p>
        <p className="text-sm text-gray-500">Max. Size: 300MB</p>
      </div>
      {errors.file && <p className="text-red-500 mt-2">{errors.file}</p>}
      <div className="flex justify-end mt-4">
        <Button
          color="text"
          className="w-full rounded-full text-black"
          style={{ backgroundColor: "#FFC424", color: "#000" }}
          onClick={handleUpload}
          disabled={isLoading}
        >
          {isLoading ? "Uploading..." : "Upload"}
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
      {errors.general && <p className="text-red-500 mt-2">{errors.general}</p>}
    </div>
  );

  const renderCreateView = (extractedJob: any) => (
    <div>
      <JobPostForm setView={setView} extractedJob={extractedJob} />
    </div>
  );

  const renderProfileView = () => (
    <div>
      <JobPostForm setView={setView} />
    </div>
  );

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl p-6 bg-white shadow-md rounded-lg">
        {view === "initial" && renderInitialView()}
        {view === "upload" && renderUploadView()}
        {view === "create" && renderCreateView(extractedJob)}
        {view === "profile" && renderProfileView()}
      </Card>
    </div>
  );
}
