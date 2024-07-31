"use client";

import React, { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import FormSkeleton from "@/app/components/FormSkeleton";

interface FormErrors {
  general?: string;
  new_password?: string;
  confirm_password?: string;
  phone_number?: string;
  otp?: string;
}

const EnterOTPComponent = () => {
  const [formData, setFormData] = useState({
    phone_number: "",
    otp: "",
    new_password: "",
    confirm_password: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const phoneNumber = urlParams.get("phone_number");
    if (phoneNumber) {
      setFormData((prevData) => ({
        ...prevData,
        phone_number: phoneNumber,
      }));
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      phone_number: formData.phone_number,
      otp: formData.otp,
      new_password: formData.new_password,
      confirm_password: formData.confirm_password,
    };

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/whatsapp-reset-password/`,
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
            phone_number: data.phone_number,
            otp: data.otp,
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
      id: "phone_number",
      label: "Phone Number",
      type: "text",
      placeholder: "Phone number",
      value: formData.phone_number,
      required: true,
      onChange: handleChange,
      error: errors.phone_number,
      readOnly: true
    },
    {
      id: "otp",
      label: "OTP",
      type: "text",
      placeholder: "Enter OTP",
      value: formData.otp,
      required: true,
      onChange: handleChange,
      error: errors.otp,
    },
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

export default EnterOTPComponent;
