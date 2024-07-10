"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button, Label } from "flowbite-react";
import { FaWhatsapp } from "react-icons/fa";
import Link from "next/link";
import FormSkeleton, { Field } from "../components/FormSkeleton";
import PhoneNumberDialog from "../components/PhoneNumberDialog";

const countryOptions = [
  { value: "poland", label: "Poland" },
  { value: "usa", label: "USA" },
  { value: "germany", label: "Germany" },
];

const SignUpPage = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    companyName: "",
    location: "", 
    emailOrPhone: "",
    password: "",
    confirmPassword: "",
    userType: "employer", 
  });
  const [isPhoneDialogOpen, setPhoneDialogOpen] = useState(false);

  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleLocationChange = (selectedOption: any) => {
    setFormData({
      ...formData,
      location: selectedOption?.value || "",
    });
  };

  const handlePhoneNumberSubmit = (phoneNumber: string) => {
    console.log("Phone number submitted:", phoneNumber);
    router.push("/complete-sign-up");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
    router.push("/enter-code");
  };

  const fields: Field[] = [
    {
      id: "firstName",
      label: "First Name",
      type: "text",
      placeholder: "First name",
      value: formData.firstName,
      required: true,
      onChange: handleChange,
    },
    {
      id: "lastName",
      label: "Last Name",
      type: "text",
      placeholder: "Last name",
      value: formData.lastName,
      required: true,
      onChange: handleChange,
    },
    {
      id: "companyName",
      label: "Company Name",
      type: "text",
      placeholder: "Company name",
      value: formData.companyName,
      required: true,
      onChange: handleChange,
    },
    {
      id: "location",
      label: "Location",
      type: "select",
      placeholder: "Select your country",
      value: formData.location,
      required: true,
      onChange: handleLocationChange,
      options: countryOptions,
    },
    {
      id: "emailOrPhone",
      label: "Email or Phone Number",
      type: "text",
      placeholder: "name@gmail.com or +(00)0000000000",
      value: formData.emailOrPhone,
      required: true,
      onChange: handleChange,
    },
    {
      id: "password",
      label: "Password",
      type: "password",
      placeholder: "Password",
      value: formData.password,
      required: true,
      onChange: handleChange,
    },
    {
      id: "confirmPassword",
      label: "Confirm Password",
      type: "password",
      placeholder: "Confirm password",
      value: formData.confirmPassword,
      required: true,
      onChange: handleChange,
    },
  ];

  const additionalElements = (
    <div className="flex flex-col gap-4">
      <Button
        color="primary"
        className="flex items-center justify-center w-full mb-4 border border-gray-300 rounded-full hover:bg-gray-200 transition duration-150"
        onClick={() => setPhoneDialogOpen(true)}
      >
        <img
          src="landing_assets/images/whatsapp.svg"
          alt="WhatsApp"
          className="mr-2"
        />
        <span className="mt-1 font-medium"> Sign in with WhatsApp</span>
      </Button>
      <p className="text-center">Or</p>
      <div className="flex justify-center gap-4">
        <Button
          color="light"
          className={`rounded-2xl w-full border ${
            formData.userType === "jobSeeker"
              ? "bg-green-500 text-white"
              : "border-gray-300 hover:bg-gray-200"
          } transition duration-150`}
          onClick={() => setFormData({ ...formData, userType: "jobSeeker" })}
        >
          Job Seeker
        </Button>
        <Button
          color="light"
          className={`rounded-2xl w-full border ${
            formData.userType === "employer"
              ? "bg-green-500 text-white"
              : "border-gray-300 hover:bg-gray-200"
          } transition duration-150`}
          onClick={() => setFormData({ ...formData, userType: "employer" })}
        >
          Employer
        </Button>
      </div>
    </div>
  );

  return (
    <>
      <FormSkeleton
        title="Sign Up"
        subtitle={
          <span>
            Already have an account?{" "}
            <Link href="/sign-in" legacyBehavior>
              <a className="text-[#116034] bold-text">Sign in</a>
            </Link>
          </span>
        }
        fields={fields}
        buttonText="Create Free Account"
        onSubmit={handleSubmit}
        showCheckbox={false}
        additionalElements={additionalElements}
      />
      <PhoneNumberDialog
        isOpen={isPhoneDialogOpen}
        onClose={() => setPhoneDialogOpen(false)}
        onSubmit={handlePhoneNumberSubmit}
      />
    </>
  );
};

export default SignUpPage;
