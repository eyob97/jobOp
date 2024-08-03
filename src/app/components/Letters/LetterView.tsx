import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "@/app/redux/store";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { Button, Card } from "flowbite-react";
import { fetchFiles } from "@/app/redux/letterSlice";
import { useRouter } from "next/navigation";

interface LetterViewProps {
  letterType: "Cover Letter" | "Motivation Letter";
  onBack: () => void;
  jobId: number;
}

const LetterView: React.FC<LetterViewProps> = ({
  letterType,
  onBack,
  jobId,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const letterState = useSelector((state: RootState) => state.letters);
  const [showApplyModal, setShowApplyModal] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (jobId) {
      dispatch(fetchFiles());
    }
  }, [dispatch, jobId]);

  const fileData = letterState.coverLetter.files.find(
    (file) => file.id === jobId
  );


  const downloadAsPDF = () => {
    const input = document.getElementById("letter-content");

    if (input) {
      html2canvas(input).then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF();
        const imgProps = pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
        pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
        pdf.save(`${letterType}.pdf`);
      });
    }
  };

  const handleApply = () => {
    router.push(`/dashboard`);
  };

  if (!fileData) return <div>Loading...</div>;

  const getLetterContent = () => {


    if (
      fileData &&
      fileData.file_type.toLowerCase() === letterType.toLowerCase()
    ) {
      return fileData.details;
    }
    return "";
  };

  const letterContent = getLetterContent();

  const contact_info = fileData && fileData.user?.contact_info;
  const full_name = fileData && fileData.user?.full_name;

  return (
    <div className="min-h-screen w-full flex flex-col items-start justify-start bg-[rgba(35,149,85,0.19)]">
      <div className="sticky top-0 w-full flex justify-between items-center bg-white p-4 shadow-md z-10">
        <h2 className="text-4xl font-bold">
          {letterType === "Cover Letter" ? "Cover Letter" : "Motivation Letter"}{" "}
          for {full_name}
        </h2>
        <Button onClick={downloadAsPDF} className="bg-green-500 text-white">
          Download as PDF
        </Button>
      </div>
      <div className="flex flex-col items-center w-full p-4">
        <Card className="w-full max-w-4xl bg-white shadow-md rounded-2xl p-8">
          <div
            id="letter-content"
            className="whitespace-pre-wrap border border-gray-300 rounded-lg p-4"
            style={{ minHeight: "80vh" }}
            dangerouslySetInnerHTML={{ __html: letterContent }}
          ></div>
          <div className="flex justify-between mt-8 border-t border-gray-200 pt-4">
            <span>E: {contact_info}</span>
          </div>
        </Card>
      </div>
      <div className="flex justify-end w-full p-4 gap-4">
        <Button
          className="bg-gray-200 text-black rounded-full px-4 py-2"
          onClick={onBack}
        >
          Back
        </Button>
        <Button
          className="bg-yellow-400 text-black rounded-full px-4 py-2"
          onClick={handleApply}
        >
          Apply
        </Button>
      </div>
    </div>
  );
};

export default LetterView;
