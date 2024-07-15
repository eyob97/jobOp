"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import FormSkeleton from "@/app/components/FormSkeleton";

interface FormErrors {
  general?: string;
  email?: string;
}

const ResetPasswordPage = () => {
  const [formData, setFormData] = useState({
    email: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/request-reset/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: formData.email }),
        }
      );

      if (response.ok) {
        setMessage("Password reset link has been sent to your email.");
      } else {
        const errorData = await response.json();
        setErrors({ general: errorData.message || "Failed to send reset link" });
      }
    } catch (error) {
      console.error("Error sending reset link:", error);
      setErrors({ general: "An error occurred. Please try again later." });
    }
  };

  const fields = [
    {
      id: "email",
      label: "Email",
      type: "email",
      placeholder: "email@gmail.com",
      value: formData.email,
      required: true,
      onChange: handleChange,
      error: errors.email, 
    },
  ];

  return (
    <FormSkeleton
      title="Reset Password"
      subtitle={<span>Enter your email to reset your password</span>}
      fields={fields}
      buttonText="Send Reset Link"
      onSubmit={handleSubmit}
      showCheckbox={false}
      generalError={errors.general}
      additionalElements={
        <div className="text-center mt-4">
          {message && <p className="text-green-500">{message}</p>}
        </div>
      }
    />
  );
};

export default ResetPasswordPage;
