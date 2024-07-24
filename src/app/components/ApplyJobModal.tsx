import React from "react";
import { Modal, Label, Select, Button } from "flowbite-react";
import { EnvelopeSimple, ChatText } from "phosphor-react";
import { FaArrowRight } from "react-icons/fa";
import CustomButton from "./CustomButton";

const ApplyModal: React.FC<{ show: boolean; onClose: () => void }> = ({
  show,
  onClose,
}) => {
  return (
    <Modal show={show} onClose={onClose} className="rounded-4xl">
      <Modal.Header>
        <h2 className="text-3xl font-bold">Apply</h2>
      </Modal.Header>
      <Modal.Body>
        <div className="space-y-4">
          <div className="flex flex-col items-center space-y-2 p-4 border rounded-lg">
            <div className="flex-shrink-0">
              <EnvelopeSimple size={32} color="black" />
            </div>
            <p className="text-lg font-semibold">
              Generate Cover letter with AI or
            </p>
            <a href="#" className="text-green-600">
              upload from computer
            </a>
          </div>
          <div className="flex flex-col items-center space-y-2 p-4 border rounded-lg">
            <div className="flex-shrink-0">
              <ChatText size={32} color="black" />
            </div>
            <p className="text-lg font-semibold">
              Generate Motivation letter with AI or
            </p>
            <a href="#" className="text-green-600">
              upload from computer
            </a>
          </div>
          <div>
            <Label htmlFor="cvFile" className="block mb-2">
              CV File
            </Label>
            <Select id="cvFile" className="block w-full">
              <option>Choose a file from your system</option>
              <option>CV_test.pdf</option>
              <option>CV_test.docx</option>
            </Select>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer className="flex justify-between ">
        <Button color="gray" className="rounded-full" onClick={onClose}>
          Cancel
        </Button>
        <CustomButton>
          Apply <FaArrowRight className=" mt-1" />
        </CustomButton>
      </Modal.Footer>
    </Modal>
  );
};

export default ApplyModal;
