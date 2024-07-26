'use client';

import React, { useState } from "react";
import { Modal, Button, Label, Select } from "flowbite-react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/app/redux/store";
import { createWhatsapp } from "@/app/redux/authSlice";

interface PhoneNumberDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (phoneNumber: string, userType: string) => Promise<void>; 
}

const PhoneNumberDialog: React.FC<PhoneNumberDialogProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [userType, setUserType] = useState("Job Seeker");
  const [confirming, setConfirming] = useState(false);
  const [error, setError] = useState("");
  const dispatch = useDispatch<AppDispatch>();

  const handlePhoneNumberChange = (value: string) => {
    setPhoneNumber(`+${value}`);
    if (value) {
      setError("");
    }
  };

  const handleContinue = () => {
    if (phoneNumber && phoneNumber.length >= 10) {
      setConfirming(true);
      setError("");
    } else {
      setError("Please enter a valid phone number.");
    }
  };

  const handleSubmit = async () => {
    if (phoneNumber && phoneNumber.length >= 10) {
      try {
        await onSubmit(phoneNumber, userType);
        setConfirming(false);
        setError("");
        onClose();
      } catch (err: any) {
        if (err.phone_number) {
          setError(err.phone_number[0]);
        } else {
          setError("Your phone number format is wrong or already in use.");
        }
      }
    } else {
      setError("Please enter a valid phone number.");
    }
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
                <Link href="/auth/sign-in" legacyBehavior>
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
              <Select
                value={userType}
                onChange={(e) => setUserType(e.target.value)}
                required
              >
                <option value="Job Seeker">Job Seeker</option>
                <option value="Employer">Employer</option>
              </Select>
              {error && (
                <span className="text-red-500 text-sm">{error}</span>
              )}
              <Label className="font-thin text-sm">
                You’ll create a {userType.toLowerCase()} account with WhatsApp
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
              {error && (
                <span className="text-red-500 text-sm">{error}</span>
              )}
            </>
          )}
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default PhoneNumberDialog;
