"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/redux/store";
import { loginUser, sendOTP } from "@/app/redux/authSlice";
import FormSkeleton from "@/app/components/LandingPage/FormSkeleton";
import Link from "next/link";

interface FormErrors {
  general?: string;
  username?: string;
  password?: string;
}

const SignIn: React.FC = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [showResend, setShowResend] = useState(false);

  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  // const error = useSelector((state: RootState) => state?.auth?.error);

  // useEffect(() => {
  //   if (error) {
  //     setErrors({ general: error });
  //     console.error("Auth error:", error);
  //   }
  // }, [error]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const resultAction = await dispatch(loginUser(formData));
    if (loginUser.fulfilled.match(resultAction)) {
      router.push("/dashboard");
    } else {
      const payload = resultAction.payload as any;
      if (payload?.inactive) {
        setErrors({ general: payload.inactive[0] });
        setShowResend(true);
      } else {
        if (
          payload?.password &&
          payload?.password[0] === "Incorrect password."
        ) {
          setErrors({ password: "Incorrect password or email" });
        } else
          setErrors(
            payload || { general: "An error occurred. Please try again later." }
          );
      }
    }
  };

  const handleResend = async () => {
    const resultAction = await dispatch(
      sendOTP({
        email: formData.username,
        operation_type: "VERIFICATION",
      })
    );
    if (sendOTP.fulfilled.match(resultAction)) {
      router.push(`/auth/enter-code?email=${formData.username}`);
    } else {
      setErrors({ general: resultAction.payload as string });
    }
  };

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
          <br />
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

export default SignIn;
