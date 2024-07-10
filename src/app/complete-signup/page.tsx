"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import FormSkeleton from "../components/FormSkeleton";

const CompleteSignUp = () => {
  const [formData, setFormData] = useState({
    code: "",
    firstName: "",
    lastName: "",
    password: "",
    confirmPassword: "",
  });

  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
    router.push("/");
  };

  const fields = [
    {
      id: "code",
      label: "6-digit code",
      type: "text",
      placeholder: "Enter the code",
      value: formData.code,
      required: true,
      onChange: handleChange,
    },
    {
      id: "firstName",
      label: "First name",
      type: "text",
      placeholder: "First name",
      value: formData.firstName,
      required: true,
      onChange: handleChange,
    },
    {
      id: "lastName",
      label: "Last name",
      type: "text",
      placeholder: "Last name",
      value: formData.lastName,
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
      label: "Confirm password",
      type: "password",
      placeholder: "Confirm password",
      value: formData.confirmPassword,
      required: true,
      onChange: handleChange,
    },
  ];

  return (
    <FormSkeleton
      title="Complete your account"
      subtitle={
        <span>
          Already have an account?{" "}
          <a href="/sign-in" className="text-[#116034] bold-text">
            Sign in
          </a>
        </span>
      }
      fields={fields}
      buttonText="Continue"
      onSubmit={handleSubmit}
      showCheckbox={false}
    />
  );
};

export default CompleteSignUp;
