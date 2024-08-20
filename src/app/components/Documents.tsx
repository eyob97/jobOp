"use client";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/app/redux/store";
import { fetchFiles, deleteFile } from "../redux/letterSlice";
import { Button, Card, Dropdown } from "flowbite-react";
import { HiDotsVertical, HiMail } from "react-icons/hi";
import { Document, Page, pdfjs } from "react-pdf";
import { useRouter } from "next/navigation";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

interface DocumentsProps {
  letterType: "Cover Letter" | "Motivation Letter";
  onGenerate: (letterType: "Cover Letter" | "Motivation Letter") => void;
}

const Documents: React.FC<DocumentsProps> = ({ letterType, onGenerate }) => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const [files, setFiles] = useState<any[]>([]);
  const [numPages, setNumPages] = useState<number | null>(null);
  const isLoading = useSelector(
    (state: RootState) => state.letters.coverLetter.isLoading
  );
  const error = useSelector(
    (state: RootState) => state.letters.coverLetter.error
  );

  useEffect(() => {
    dispatch(fetchFiles())
      .unwrap()
      .then((data) => setFiles(data))
      .catch((err) => console.error(err));
  }, [dispatch]);

  const handleDelete = async (fileId: number) => {
    try {
      await dispatch(deleteFile(fileId)).unwrap();
      setFiles(files.filter((file) => file.id !== fileId));
    } catch (err) {
      console.error("Failed to delete file:", err);
    }
  };

  const handleDownload = (fileUrl: string) => {
    const link = document.createElement("a");
    link.href = fileUrl;
    link.download = "file.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleViewDocument = (fileId: number, fileType: string) => {
    router.push(`/document-view?id=${fileId}&type=${fileType}`);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const onDocumentLoadSuccess = ({ numPages }: any) => {
    setNumPages(numPages);
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-start justify-start bg-[rgba(35,149,85,0.19)] p-4">
      <div className="w-full flex justify-between items-center bg-white p-4 shadow-md mb-4">
        <h2 className="text-2xl font-bold mb-2">Your documents</h2>
        <div className="flex gap-4">
          <Button
            type="submit"
            className="rounded-full text-black"
            style={{ backgroundColor: "#FFC424", color: "#000" }}
            onClick={() => onGenerate("Cover Letter")}
          >
            Generate Cover Letter
          </Button>
          <Button
            type="submit"
            className="rounded-full text-black"
            style={{ backgroundColor: "#FFC424", color: "#000" }}
            onClick={() => onGenerate("Motivation Letter")}
          >
            Generate Motivation Letter
          </Button>
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 w-full">
        {files.map((file: any) => (
          <Card
            key={file.id}
            className="p-4 relative rounded border"
            style={{
              borderColor: "rgba(214, 235, 223, 1)",
              borderWidth: "1px",
            }}
          >
            <div className="absolute top-2 left-2 text-gray-500">
              <HiMail className="text-green-600" size={32} />
            </div>
            <div className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 cursor-pointer">
              <Dropdown
                inline={true}
                label={
                  <HiDotsVertical
                    size={32}
                    style={{ color: "rgba(35, 149, 85, 0.19)" }}
                  />
                }
              >
                {file.file_type === "Resume" ? (
                  <Dropdown.Item onClick={() => handleDownload(file.file)}>
                    Download
                  </Dropdown.Item>
                ) : (
                  <Dropdown.Item
                    onClick={() => handleViewDocument(file.id, file.file_type)}
                  >
                    View
                  </Dropdown.Item>
                )}
                <Dropdown.Item onClick={() => handleDelete(file.id)}>
                  Delete
                </Dropdown.Item>
              </Dropdown>
            </div>
            <h3 className="text-xl font-semibold truncate mt-6">
              {file.file_name || "Untitled"}
            </h3>
            <p className="text-gray-500">{file.file_type}</p>
            {/* {file.file && (
              <div className="mt-4">
                <Document
                  file={file.file}
                  onLoadSuccess={onDocumentLoadSuccess}
                  loading={<div>Loading PDF...</div>}
                >
                  <Page pageNumber={1} width={300} />
                </Document>
              </div>
            )} */}
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Documents;
