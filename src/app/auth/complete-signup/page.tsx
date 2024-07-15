"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import FormSkeleton, { Field } from "@/app/components/FormSkeleton";

interface FormErrors {
  code?: string;
  general?: string;
  first_name?: string;
  last_name?: string;
  phone_number?: string;
  password?: string;
  confirm_password?: string;
}

const CompleteSignUp = () => {
  const [formData, setFormData] = useState({
    code: "",
    firstName: "",
    lastName: "",
    password: "",
    confirmPassword: "",
    phone_number: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [message, setMessage] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const phone = searchParams.get("phone");
    if (phone) {
      setFormData((prevData) => ({
        ...prevData,
        phone_number: `+${phone.replace(/\s+/g, "")}`,
      }));
    }
  }, [searchParams]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);

    const payload: any = {
      otp: formData.code,
      phone_number: formData.phone_number,
      first_name: formData.firstName,
      last_name: formData.lastName,
      password: formData.password,
      confirm_password: formData.confirmPassword,
    };

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/verify/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        console.log("Verification successful");
        router.push("/");
      } else {
        const responseText = await response.text();
        try {
          const errorData = JSON.parse(responseText);
          console.error("Error verifying user:", errorData);
          setErrors({ general: errorData.message || 'Failed to verify user' });
        } catch (parseError) {
          console.error("Error parsing response:", responseText);
          setErrors({ general: 'Failed to verify user' });
        }
      }
    } catch (error) {
      console.error("Error verifying user:", error);
      setErrors({ general: 'Failed to verify user' });
    }
  };

  const handleResend = async () => {
    const payload = {
      phone_number: formData.phone_number,
      operation_type: "WHATSAPP VERIFICATION",
    };

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/otp/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const responseText = await response.text();
      try {
        const data = JSON.parse(responseText);
        if (response.ok) {
          console.log('OTP sent again');
          setMessage('OTP sent successfully.');
        } else {
          console.error('Error sending OTP:', data);
          setMessage(data.message || 'Failed to send OTP');
        }
      } catch (parseError) {
        console.error("Error parsing response:", responseText);
        setMessage('Failed to send OTP');
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
    {
      id: "firstName",
      label: "First Name",
      type: "text",
      placeholder: "First name",
      value: formData.firstName,
      required: true,
      onChange: handleChange,
      error: errors.first_name,
    },
    {
      id: "lastName",
      label: "Last Name",
      type: "text",
      placeholder: "Last name",
      value: formData.lastName,
      required: true,
      onChange: handleChange,
      error: errors.last_name,
    },
    {
      id: "password",
      label: "Password",
      type: "password",
      placeholder: "Password",
      value: formData.password,
      required: true,
      onChange: handleChange,
      error: errors.password,
    },
    {
      id: "confirmPassword",
      label: "Confirm Password",
      type: "password",
      placeholder: "Confirm password",
      value: formData.confirmPassword,
      required: true,
      onChange: handleChange,
      error: errors.confirm_password,
    },
    {
      id: "phone",
      label: "Phone Number",
      type: "text",
      placeholder: "Phone number",
      value: formData.phone_number,
      required: true,
      readonly: true, 
      onChange: () => {},
    },
  ];

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <FormSkeleton
        title="Complete your account"
        subtitle={
          <span>
            Provide the code we just sent to your phone <br />
            Didn’t get a code?{" "}
            <a href="#" className="text-[#116034] bold-text" onClick={handleResend}>
              Send again
            </a>
            <br></br>
            Already have an account?{" "}
            <a href="/auth/sign-in" className="text-[#116034] bold-text">
              Sign in
            </a>
          </span>
        }
        fields={fields}
        buttonText="Continue"
        onSubmit={handleSubmit}
        showCheckbox={false}
        generalError={errors.general}
      />
    </Suspense>
  );
};

export default CompleteSignUp;
