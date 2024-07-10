'use client';

import React, { useState } from "react";
import { Modal, Button, Label, TextInput } from "flowbite-react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import Link from "next/link";

interface PhoneNumberDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (phoneNumber: string) => void;
}

const PhoneNumberDialog: React.FC<PhoneNumberDialogProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [confirming, setConfirming] = useState(false);
  const [error, setError] = useState("");

  const handlePhoneNumberChange = (value: string) => {
    setPhoneNumber(value);
    if (value) {
      setError("");
    }
  };

  const handleContinue = () => {
    if (phoneNumber) {
      setConfirming(true);
    } else {
      setError("Please enter a valid phone number.");
    }
  };

  const handleSubmit = () => {
    onSubmit(phoneNumber);
    onClose();
    setConfirming(false);
  };

  return (
    <Modal show={isOpen} onClose={onClose} size="md" dismissible>
      <Modal.Header className="text-left">Enter the phone number</Modal.Header>
      <Modal.Body>
        <div className="space-y-6 rounded-2xl p-4">
          {!confirming ? (
            <>
              <span>
                Already have an account?{" "}
                <Link href="/sign-in" legacyBehavior>
                  <a className="text-[#116034] bold-text">Sign in</a>
                </Link>
              </span>
              <PhoneInput
                country={"us"}
                value={phoneNumber}
                onChange={handlePhoneNumberChange}
                inputStyle={{
                  width: "100%",
                  color: "black",
                  borderRadius: "1rem",
                  borderColor: error ? "red" : undefined,
                }}
                dropdownStyle={{ backgroundColor: "white", color: "black" }}
              />
              {error && (
                <span className="text-red-500 text-sm">{error}</span>
              )}
              <Label className="font-thin text-sm">
                You’ll create a job seeker account with WhatsApp
              </Label>
              <Button
                className="w-full rounded-full text-black"
                style={{ backgroundColor: "#FFC424" }}
                onClick={handleContinue}
              >
                Continue
              </Button>
            </>
          ) : (
            <>
              <p>Are you sure you want to continue with this number?</p>
              <p className="font-bold">{phoneNumber}</p>
              <Button
                className="w-full rounded-full text-black mb-4"
                style={{ backgroundColor: "#FFC424" }}
                onClick={handleSubmit}
              >
                Confirm
              </Button>
              <Button
                className="w-full rounded-full text-black"
                onClick={() => setConfirming(false)}
              >
                Go Back
              </Button>
            </>
          )}
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default PhoneNumberDialog;
