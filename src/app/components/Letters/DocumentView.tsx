"use client";

import React, { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/app/redux/store";
import { fetchFiles } from "@/app/redux/letterSlice";
import { Button, Card } from "flowbite-react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { Document, Page, pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const DocumentView: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const searchParams = useSearchParams();
  const router = useRouter();
  const id = parseInt(searchParams.get("id") || "0");
  const type = searchParams.get("type");

  const [numPages, setNumPages] = useState<number | null>(null);
  const { files, isLoading, error } = useSelector(
    (state: RootState) => state.letters.coverLetter
  );
  const [selectedFile, setSelectedFile] = useState<any>(null);

  useEffect(() => {
    dispatch(fetchFiles());
  }, [dispatch]);

  useEffect(() => {
    if (files.length > 0) {
      const file = files.find((f) => f.id === id);
      setSelectedFile(file);
    }
  }, [files, id]);

  const onDocumentLoadSuccess = ({ numPages }: any) => {
    setNumPages(numPages);
  };

  const downloadAsPDF = () => {
    const input = document.getElementById("document-content");

    if (input) {
      html2canvas(input).then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF();
        const imgProps = pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
        pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
        pdf.save(`${type}.pdf`);
      });
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!selectedFile) {
    return <div>No document found</div>;
  }

  const isResume = selectedFile.file_type === "Resume";

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="min-h-screen w-full flex flex-col items-start justify-start bg-[rgba(35,149,85,0.19)]">
        <div className="sticky top-0 w-full flex justify-between items-center bg-white p-4 shadow-md z-10">
          <h2 className="text-4xl font-bold">
            {type} for {selectedFile.full_name}
          </h2>
          <Button onClick={downloadAsPDF} className="bg-green-500 text-white">
            Download as PDF
          </Button>
        </div>
        <div className="flex flex-col items-center w-full p-4">
          <Card className="w-full max-w-4xl bg-white shadow-md rounded-2xl p-8">
            {isResume ? (
              <Document
                file={selectedFile.file}
                onLoadSuccess={onDocumentLoadSuccess}
                loading={<div>Loading PDF...</div>}
              >
                <Page pageNumber={1} width={300} />
              </Document>
            ) : (
              <div
                id="document-content"
                className="whitespace-pre-wrap border border-gray-300 rounded-lg p-4"
                style={{ minHeight: "80vh" }}
                dangerouslySetInnerHTML={{
                  __html: selectedFile.details.replace(/\n/g, "<br />"),
                }}
              ></div>
            )}
            <div className="flex justify-between mt-8 border-t border-gray-200 pt-4">
              <span>E: {selectedFile.contact_info}</span>
            </div>
          </Card>
        </div>
        <div className="flex justify-end w-full p-4 gap-4">
          <Button
            className="bg-gray-200 text-black rounded-full px-4 py-2"
            onClick={() => router.back()}
          >
            Back
          </Button>
        </div>
      </div>
    </Suspense>
  );
};

export default DocumentView;
