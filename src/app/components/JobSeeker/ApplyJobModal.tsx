import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/app/redux/store";
import { fetchFiles } from "@/app/redux/letterSlice";
import { applyForJob } from "@/app/redux/jobSlice";
import { uploadResume } from "@/app/redux/resumeSlice";
import { Button, Modal, Select, Label, FileInput } from "flowbite-react";
import { EnvelopeSimple, ChatText } from "phosphor-react";
import { FaArrowRight } from "react-icons/fa";
import CustomButton from "../CustomButton";
import { useRouter } from "next/navigation";

interface ApplyModalProps {
  show: boolean;
  onClose: () => void;
  jobId: number;
  onGenerate: (type: 'coverLetter' | 'motivationLetter') => void;
}

const ApplyModal: React.FC<ApplyModalProps> = ({ show, onClose, jobId, onGenerate }) => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter(); 
  const { files } = useSelector((state: RootState) => state.letters.coverLetter);
  const { hasUploadedFile } = useSelector((state: RootState) => state.resume);
  const [selectedResume, setSelectedResume] = useState<number | null>(null);
  const [uploadedResume, setUploadedResume] = useState<File | null>(null);
  const [selectedCoverLetter, setSelectedCoverLetter] = useState<number | null>(null);
  const [selectedMotivationLetter, setSelectedMotivationLetter] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true);

  useEffect(() => {
    if (show) {
      dispatch(fetchFiles());
    }
  }, [show, dispatch]);

  useEffect(() => {
    if (hasUploadedFile) {
      dispatch(fetchFiles());
    }
  }, [hasUploadedFile, dispatch]);

  useEffect(() => {
    if ((selectedResume || uploadedResume) && !error) {
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }
  }, [selectedResume, uploadedResume, error]);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === "application/pdf") {
      setUploadedResume(file);
      try {
        await dispatch(uploadResume(file)).unwrap();
        setError(null);
      } catch (err) {
        setError("Failed to upload the resume. Please try again.");
      }
    } else {
      setError("Please upload a PDF file.");
    }
  };

  const handleApply = async () => {
    if ((selectedResume || uploadedResume)) {
      const applicationData: any = {
        job: jobId,
        resume: selectedResume ?? uploadedResume,
        cover_letter: selectedCoverLetter || undefined,
        motivation_letter: selectedMotivationLetter || undefined,
      };

      try {
        await dispatch(applyForJob(applicationData)).unwrap();
        setError(null);
        onClose();
      } catch (err) {
        setError("Failed to apply for the job. Please try again.");
      }
    } else {
      setError("Please select or upload a resume.");
    }
  };

  const handleGenerate = (type: 'coverLetter' | 'motivationLetter') => {
    router.push(`/letter-form?page=${type}`);
  };

  return (
    <Modal show={show} onClose={onClose} size="lg" className="rounded-4xl">
      <Modal.Header>
        <h2 className="text-3xl font-bold">Apply</h2>
      </Modal.Header>
      <Modal.Body>
        <div className="space-y-4">
          {error && <div className="text-red-500">{error}</div>}
          <div className="flex flex-col items-center space-y-2 p-4 border rounded-lg">
            <div className="flex-shrink-0">
              <EnvelopeSimple size={32} color="black" />
            </div>
            <p className="text-lg font-semibold">
              Generate Cover letter with AI or
            </p>
            <Button
              type="button"
              className="text-green-600"
              onClick={() => handleGenerate('coverLetter')}
            >
              Generate
            </Button>
          </div>
          <div className="flex flex-col items-center space-y-2 p-4 border rounded-lg">
            <div className="flex-shrink-0">
              <ChatText size={32} color="black" />
            </div>
            <p className="text-lg font-semibold">
              Generate Motivation letter with AI or
            </p>
            <Button
              type="button"
              className="text-green-600"
              onClick={() => handleGenerate('motivationLetter')}
            >
              Generate
            </Button>
          </div>
          <div>
            <Label htmlFor="cvFile" className="block mb-2">
              CV File
            </Label>
            <Select id="cvFile" className="block w-full" onChange={(e) => setSelectedResume(parseInt(e.target.value))}>
              <option value="">Choose a file from your system</option>
              {files.filter((file) => file.file_type === "Resume").map((file) => (
                <option key={file.id} value={file.id}>
                  {file.file_name}
                </option>
              ))}
            </Select>
            <FileInput
              id="uploadResume"
              accept=".pdf"
              onChange={handleFileUpload}
              className="mt-2"
            />
          </div>
          <div>
            <Label htmlFor="coverLetterFile" className="block mb-2">
              Cover Letter File
            </Label>
            <Select
              id="coverLetterFile"
              className="block w-full"
              onChange={(e) => setSelectedCoverLetter(parseInt(e.target.value))}
            >
              <option value="">Choose a cover letter from your files</option>
              {files.filter((file) => file.file_type === "Cover Letter").map((file) => (
                <option key={file.id} value={file.id}>
                  {file.file_name}
                </option>
              ))}
            </Select>
          </div>
          <div>
            <Label htmlFor="motivationLetterFile" className="block mb-2">
              Motivation Letter File
            </Label>
            <Select
              id="motivationLetterFile"
              className="block w-full"
              onChange={(e) => setSelectedMotivationLetter(parseInt(e.target.value))}
            >
              <option value="">Choose a motivation letter from your files</option>
              {files.filter((file) => file.file_type === "Motivation Letter").map((file) => (
                <option key={file.id} value={file.id}>
                  {file.file_name}
                </option>
              ))}
            </Select>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer className="flex justify-between">
        <Button color="gray" className="rounded-full" onClick={onClose}>
          Cancel
        </Button>
        <CustomButton onClick={handleApply} disabled={isButtonDisabled}>
          Apply <FaArrowRight className="mt-1" />
        </CustomButton>
      </Modal.Footer>
    </Modal>
  );
};

export default ApplyModal;
