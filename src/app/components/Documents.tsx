"use client";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/app/redux/store";
import { fetchFiles } from "../redux/letterSlice";
import { Button, Card, Dropdown } from "flowbite-react";
import { HiDotsVertical, HiMail } from "react-icons/hi";
import { Document, Page, pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const Documents: React.FC<{ onGenerate: () => void }> = ({ onGenerate }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { files, isLoading, error } = useSelector(
    (state: RootState) => state.coverLetter
  );
  const [numPages, setNumPages] = useState<number | null>(null);

  useEffect(() => {
    dispatch(fetchFiles());
  }, [dispatch]);

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
    <div className="min-h-screen w-full flex flex-col items-start justify-start bg-[rgba(35,149,85,0.19)]">
      <div className="sticky top-0 w-full flex justify-between items-center bg-white p-4 shadow-md z-10">
        <h2 className="text-4xl font-bold mb-2">Your documents</h2>

        <Button
          type="submit"
          className="rounded-full text-black"
          style={{ backgroundColor: "#FFC424", color: "#000" }}
          onClick={onGenerate}
        >
          Generate
        </Button>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {files.map((file) => (
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
                <Dropdown.Item>Edit</Dropdown.Item>
                <Dropdown.Item onClick={() => []}>Delete</Dropdown.Item>
              </Dropdown>
            </div>
            <h3 className="text-xl font-semibold truncate mt-6">
              {file.file_name || "Untitled"}
            </h3>
            <p className="text-gray-500">{file.file_type}</p>
            {file.file && (
              <div className="mt-4">
                <Document
                  file={file.file}
                  onLoadSuccess={onDocumentLoadSuccess}
                  loading={<div>Loading PDF...</div>}
                >
                  <Page pageNumber={1} width={300} />
                </Document>
              </div>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Documents;
