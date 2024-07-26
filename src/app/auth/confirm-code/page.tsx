"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { verifyOTP } from "@/app/redux/authSlice";
import FormSkeleton, { Field } from "@/app/components/FormSkeleton";
import { RootState, AppDispatch } from "@/app/redux/store";

interface FormErrors {
  code?: string;
  general?: string;
}

const ConfirmCode: React.FC = () => {
  const [code, setCode] = useState('');
  const [errors, setErrors] = useState<FormErrors>({});
  const [message, setMessage] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useDispatch<AppDispatch>();
  const { error } = useSelector((state: RootState) => state.auth);

  const email = searchParams.get("email");

  useEffect(() => {
    if (error) {
      setErrors({ general: error });
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

    const resultAction = await dispatch(verifyOTP(payload));
    if (verifyOTP.fulfilled.match(resultAction)) {
      setMessage("Verification successful. Redirecting...");
      setTimeout(() => {
        router.push('/auth/sign-in');
      }, 2000); 
    } else {
      setErrors({ general: resultAction.payload as string });
    }
  };

  const fields: Field[] = [
    {
      id: 'code',
      label: 'Confirmation Code',
      type: 'text',
      placeholder: 'Enter the 6-digit code',
      value: code,
      required: true,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => setCode(e.target.value),
    },
  ];

  return (
    <>
      <FormSkeleton
        title="Confirm Code"
        subtitle="Enter the confirmation code sent to your email"
        fields={fields}
        buttonText="Confirm"
        onSubmit={handleSubmit}
        generalError={errors.general}
      />
      {message && (
        <div className="text-green-500 mt-4">{message}</div>
      )}
    </>
  );
};

export default ConfirmCode;
