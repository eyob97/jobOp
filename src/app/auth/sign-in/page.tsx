"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import FormSkeleton from "@/app/components/FormSkeleton";

interface FormErrors {
  general?: string;
  username?: string;
  password?: string;
}

const SignInPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [showResend, setShowResend] = useState(false);

  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleResend = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/otp/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: formData.username,
            operation_type: "VERIFICATION",
          }),
        }
      );

      if (response.ok) {
        console.log("OTP sent successfully");
        router.push(`/auth/enter-code?email=${formData.username}`);
      } else {
        console.error("Failed to resend OTP");
      }
    } catch (error) {
      console.error("Error resending OTP:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      username: formData.username,
      password: formData.password,
    };

    console.log("Payload:", payload); 

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/login/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      const data = await response.json();
      console.log("Response status:", response.status); 
      console.log("Response data:", data); 

      if (response.ok) {
        router.push("/");
      } else if (data.inactive) {
        console.log("Inactive account detected"); 
        setErrors({ general: data.inactive[0] });
        setShowResend(true);
        console.log("Set errors:", errors);
        console.log("Show resend:", showResend);
      } else {
        setErrors(data);
      }
    } catch (error) {
      setErrors({ general: "An error occurred. Please try again later." });
      console.error("Error logging in:", error);
    }
  };

  useEffect(() => {
    console.log("Errors state updated:", errors);
    console.log("ShowResend state updated:", showResend);
  }, [errors, showResend]);

  const fields = [
    {
      id: "username",
      label: "Email or Phone",
      type: "text",
      placeholder: "email@gmail.com or +(00)0000000000",
      value: formData.username,
      required: true,
      onChange: handleChange,
      error: errors.username, 
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
  ];

  return (
    <FormSkeleton
      title="Sign In"
      subtitle={
        <span>
          Don't have an account?{" "}
          <Link href="/auth/sign-up" legacyBehavior>
            <a className="text-[#116034] bold-text">Sign up</a>
          </Link>
<br></br>
          Did you forget your password?{" "}
          <Link href="/auth/reset-password" legacyBehavior>
            <a className="text-[#116034] bold-text">Reset password</a>
          </Link>
        </span>
      }
      fields={fields}
      buttonText="Sign In"
      onSubmit={handleSubmit}
      showCheckbox={false}
      generalError={errors.general}
      showResend={showResend}
      onResend={handleResend}
    />
  );
};

export default SignInPage;
