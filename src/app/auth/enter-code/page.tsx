"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import FormSkeleton, { Field } from "@/app/components/FormSkeleton";

interface FormErrors {
  code?: string;
  general?: string;
}

const EnterCodePage = () => {
  const [formData, setFormData] = useState({
    code: "",
  });
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});
  const router = useRouter();
  const searchParams = useSearchParams();

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
    console.log(formData);

    const payload = {
      email: email,
      otp: formData.code,
    };

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/verify/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      
      if (response.ok) {
        console.log('Verification successful:', data);
        setMessage("Verification successful. Redirecting...");
        setTimeout(() => {
          router.push('/auth/sign-in');
        }, 2000); 
      } else {
        console.error('Error verifying code:', data);
        setErrors({ code: data.message || 'Failed to verify code' });
      }
    } catch (error) {
      console.error('Error verifying code:', error);
      setErrors({ code: 'Failed to verify code' });
    }
  };

  const handleResend = async () => {
    const payload = {
      email: email,
      operation_type: "VERIFICATION",
    };

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/otp/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok) {
        console.log('OTP sent again');
        setMessage('OTP sent successfully.');
      } else {
        console.error('Error sending OTP:', data);
        setMessage(data.message || 'Failed to send OTP');
      }
    } catch (error) {
      console.error('Error sending OTP:', error);
      setMessage('Failed to send OTP');
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
    <Suspense fallback={<div>Loading...</div>}>
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
      {message && (
        <div className="text-green-500 mt-4">
          {message}
        </div>
      )}
    </Suspense>
  );
};

export default EnterCodePage;
