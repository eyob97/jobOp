"use client";

import React, { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import FormSkeleton from "@/app/components/FormSkeleton";

interface FormErrors {
  general?: string;
  new_password?: string;
  confirm_password?: string;
}

const ResetPasswordForm = () => {
  const [formData, setFormData] = useState({
    new_password: "",
    confirm_password: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const router = useRouter();
  const pathname = usePathname();
  
  // Assuming your URL pattern is something like /reset-password/[uidb64]/[token]
  const pathParts = pathname.split("/");
  const uidb64 = pathParts[pathParts.length - 2];
  const token = pathParts[pathParts.length - 1];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      uidb64,
      token,
      new_password: formData.new_password,
      confirm_password: formData.confirm_password,
    };

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/reset-password/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      const responseText = await response.text();

      try {
        const data = JSON.parse(responseText);
        if (response.ok) {
          router.push("/auth/sign-in");
        } else {
          console.error("Error resetting password:", data);
          setErrors({
            general: data.message || "Failed to reset password",
            new_password: data.new_password,
            confirm_password: data.confirm_password,
          });
        }
      } catch (parseError) {
        console.error("Error parsing response:", responseText);
        setErrors({ general: 'Failed to reset password' });
      }
    } catch (error) {
      console.error("Error resetting password:", error);
      setErrors({ general: "An error occurred. Please try again later." });
    }
  };

  const fields = [
    {
      id: "new_password",
      label: "New Password",
      type: "password",
      placeholder: "New password",
      value: formData.new_password,
      required: true,
      onChange: handleChange,
      error: errors.new_password, 
    },
    {
      id: "confirm_password",
      label: "Confirm Password",
      type: "password",
      placeholder: "Confirm password",
      value: formData.confirm_password,
      required: true,
      onChange: handleChange,
      error: errors.confirm_password, 
    },
  ];

  return (
    <FormSkeleton
      title="Reset Password"
      subtitle={<span>Enter your new password</span>}
      fields={fields}
      buttonText="Reset Password"
      onSubmit={handleSubmit}
      showCheckbox={false}
      generalError={errors.general}
    />
  );
};

export default ResetPasswordForm;
