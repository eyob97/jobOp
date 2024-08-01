"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { verifyOTP, sendOTP } from "@/app/redux/authSlice";
import FormSkeleton, { Field } from "@/app/components/FormSkeleton";
import { RootState, AppDispatch } from "@/app/redux/store";

interface FormErrors {
  code?: string;
  general?: string;
}

const EnterCodePage: React.FC = () => {
  const [formData, setFormData] = useState({
    code: "",
  });
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});
  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useDispatch<AppDispatch>();
  const { error } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (error) {
      setErrors({ general: error });
    }
  }, [error]);

  useEffect(() => {
    const emailFromQuery = searchParams.get("email");
    if (emailFromQuery) {
      setEmail(emailFromQuery);
    }
  }, [searchParams]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;

    if (id === "code" && (!/^\d*$/.test(value) || value.length > 6)) {
      return;
    }

    setFormData({
      ...formData,
      [id]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      email: email,
      otp: formData.code,
    };

    const resultAction = await dispatch(verifyOTP(payload));
    if (verifyOTP.fulfilled.match(resultAction)) {
      setMessage("Verification successful. Redirecting...");
      setTimeout(() => {
        router.push('/auth/sign-in');
      }, 2000); 
    } else {
      setErrors({ code: resultAction.payload as string });
    }
  };

  const handleResend = async () => {
    const payload = {
      email: email,
      operation_type: "VERIFICATION",
    };

    const resultAction = await dispatch(sendOTP(payload));
    if (sendOTP.fulfilled.match(resultAction)) {
      setMessage('OTP sent successfully.');
    } else {
      setMessage(resultAction.payload as string);
    }
  };

  const fields: Field[] = [
    {
      id: "code",
      label: "6-digit code",
      type: "text",
      placeholder: "Enter the code",
      value: formData.code,
      required: true,
      onChange: handleChange,
      error: errors.code,
      maxLength: 6,
      pattern: "\\d{6}", 
      inputMode: "numeric", 
    },
  ];

  return (
      <FormSkeleton
        title="Enter Code"
        subtitle={
          <span>
            Provide the code we just sent to your email <br />
            Didn’t get a code?{" "}
            <a href="#" className="text-[#116034] bold-text" onClick={handleResend}>
              Send again
            </a>
          </span>
        }
        fields={fields}
        buttonText="Submit"
        onSubmit={handleSubmit}
        showCheckbox={false}
        generalError={errors.general} 
      />

  );
};

export default EnterCodePage;
