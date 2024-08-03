"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { verifyOTP } from "@/app/redux/authSlice";
import FormSkeleton, { Field } from "@/app/components/LandingPage/FormSkeleton";
import { RootState, AppDispatch } from "@/app/redux/store";

interface FormErrors {
  code?: string;
  general?: string;
}

const ConfirmCode: React.FC = () => {
  const [code, setCode] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});
  const [message, setMessage] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useDispatch<AppDispatch>();
  const { error } = useSelector((state: RootState) => state.auth);

  const email = searchParams.get("email");
  interface APIErrorResponse {
    otp?: string[];
    general?: string;
  }

  useEffect(() => {
    if (error) {
      const apiError = error as APIErrorResponse;
      if (apiError.otp) {
        setErrors({ code: apiError.otp[0] });
      } else {
        setErrors({ general: apiError.general || "An error occurred." });
      }
    }
  }, [error]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setErrors({ general: "Email is required." });
      return;
    }

    const payload = {
      email,
      otp: code,
    };

    try {
      const resultAction = await dispatch(verifyOTP(payload));
      if (verifyOTP.fulfilled.match(resultAction)) {
        setMessage("Verification successful. Redirecting...");
        setTimeout(() => {
          router.push("/auth/sign-in");
        }, 2000);
      } else {
        const payload = resultAction.payload as APIErrorResponse; // Cast payload to APIErrorResponse
        const normalizedErrors: FormErrors = {};
        if (payload.otp) {
          normalizedErrors.code = payload.otp[0];
        } else {
          normalizedErrors.general = payload.general || "An error occurred.";
        }
        setErrors(normalizedErrors);
      }
    } catch (err: any) {
      setErrors({ general: err.message || "An unexpected error occurred." });
    }
  };

  const fields: Field[] = [
    {
      id: "code",
      label: "Confirmation Code",
      type: "text",
      placeholder: "Enter the 6-digit code",
      value: code,
      required: true,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
        setCode(e.target.value),
      error: errors.code,
    },
  ];

  return (
    <div>
      <FormSkeleton
        title="Confirm Code"
        subtitle="Enter the confirmation code sent to your email"
        fields={fields}
        buttonText="Confirm"
        onSubmit={handleSubmit}
        generalError={errors.general}
      />
      {message && <div className="text-green-500 mt-4">{message}</div>}
    </div>
  );
};

export default ConfirmCode;
