"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import FormSkeleton from "../components/FormSkeleton";

const EnterCodeForm = () => {
  const [formData, setFormData] = useState({
    code: "",
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
      label: "Code",
      type: "text",
      placeholder: "6-digit code",
      value: formData.code,
      required: true,
      onChange: handleChange,
    },
  ];

  return (
    <FormSkeleton
      title="Enter code"
      subtitle={
        <span>
          Provide the code we just sent to your email <br />
          Didn’t get a code?{" "}
          <a href="#" className="text-[#116034] bold-text">
            Send again
          </a>
        </span>
      }
      fields={fields}
      buttonText="Sign in"
      onSubmit={handleSubmit}
      showCheckbox={false}
    />
  );
};

export default EnterCodeForm;
