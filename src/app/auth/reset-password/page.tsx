"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import FormSkeleton from "@/app/components/LandingPage/FormSkeleton";
import { Field } from "@/app/components/LandingPage/FormSkeleton";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/app/redux/store";
import { sendOTP } from "@/app/redux/authSlice";

interface FormErrors {
  general?: string;
  email?: string;
  phone?: string;
}

const ResetPasswordPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [message, setMessage] = useState("");
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement> | any) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handlePhoneNumberChange = (value: string) => {
    setFormData({
      ...formData,
      phone: `+${value}`,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setMessage("");

    const isEmail = formData.email !== "";

    try {
      if (!isEmail) {
        const payload = {
          phone_number: formData.phone,
          operation_type: "WHATSAPP PASSWORD RESET",
        };

        const resultAction = await dispatch(sendOTP(payload));

        if (sendOTP.fulfilled.match(resultAction)) {
          setMessage('OTP sent successfully.');
          router.push(`/auth/reset-password/whatsapp?phone_number=${encodeURIComponent(formData.phone)}`);
        } else {
          const errorPayload = resultAction.payload as { error: string };
          setErrors({ general: errorPayload.error });
        }
      } else {
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
          setMessage('Password reset link has been sent to your email.');
        } else {
          const errorData = await response.json();
          setErrors({ general: errorData.message || 'Failed to send reset link to your email.' });
        }
      }
    } catch (error) {
      console.error("Error sending reset link:", error);
      setErrors({ general: "An error occurred. Please try again later." });
    }
  };

  const handleResend = async () => {
    if (!formData.phone) {
      setErrors({ general: "Please enter your phone number first." });
      return;
    }

    const payload = {
      phone_number: formData.phone,
      operation_type: "WHATSAPP PASSWORD RESET",
    };

    try {
      const resultAction = await dispatch(sendOTP(payload));

      if (sendOTP.fulfilled.match(resultAction)) {
        setMessage('OTP sent successfully.');
      } else {
        const errorPayload = resultAction.payload as { error: string };
        setErrors({ general: errorPayload.error });
      }
    } catch (error) {
      console.error("Error resending OTP:", error);
      setErrors({ general: "An error occurred while resending the OTP." });
    }
  };

  const fields: Field[] = [
    {
      id: "email",
      label: "Email",
      type: "email",
      placeholder: "email@gmail.com",
      value: formData.email,
      required: formData.phone === "",
      onChange: handleChange,
      error: errors.email,
    },
    {
      id: "phone",
      label: "WhatsApp Phone Number",
      type: "phone",
      placeholder: "+1234567890",
      value: formData.phone,
      required: formData.email === "",
      onChange: handlePhoneNumberChange,
      error: errors.phone,
    },
  ];

  const initialTab = formData.email ? "email" : "phone";

  return (
    <FormSkeleton
      title="Reset Password"
      subtitle={<span>Enter your email or phone number to reset your password</span>}
      fields={fields}
      buttonText="Reset password"
      onSubmit={handleSubmit}
      showCheckbox={false}
      generalError={errors.general}
      showResend={true}
      onResend={handleResend}
      initialTab={initialTab}
      showTabs={true}
      isResetPassword={true}
      additionalElements={
        <div className="text-center mt-4">
          {message && <p className="text-green-500">{message}</p>}
        </div>
      }
    />
  );
};

export default ResetPasswordPage;
