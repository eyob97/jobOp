"use client";

import { Button, Card } from "flowbite-react";
import { useState } from "react";
import { HiDocumentText, HiPencil } from "react-icons/hi";
import JobSeekerProfileForm from "./JobSeekerProfileForm"; 

export function UploadCVCard() {
  const [view, setView] = useState("initial");

  const renderInitialView = () => (
    <div className="text-center">
      <h2 className="mb-5 text-lg font-bold text-black">Let's start</h2>
      <h2 className="mb-5 text-lg font-normal text-black">
        You can upload an existing CV and edit it later or create a new one from
        scratch
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
      <div className="border-dashed border-2 border-gray-400 p-4 rounded-lg text-center">
        <p className="mb-2">Click to upload or drag and drop</p>
        <p className="text-sm text-gray-500">Supported types: .PDF, .DOCX</p>
        <p className="text-sm text-gray-500">Max. Size: 300MB</p>
      </div>
      <div className="flex justify-end mt-4">

        <Button color="text"   className="w-full rounded-full text-black"
          style={{ backgroundColor: "#000", color: "#fff" }} onClick={() => setView("initial")}>
          Back
        </Button>
      </div>
    </div>
  );

  const renderCreateView = () => (
    <div>
      <JobSeekerProfileForm setView={setView} />
    </div>
  );

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl p-6 bg-white shadow-md rounded-lg">
        {view === "initial" && renderInitialView()}
        {view === "upload" && renderUploadView()}
        {view === "create" && renderCreateView()}
      </Card>
    </div>
  );
}
