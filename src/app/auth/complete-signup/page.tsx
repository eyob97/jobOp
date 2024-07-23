"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { completeSignUp, sendOTP } from "@/app/redux/authSlice";
import FormSkeleton, { Field } from "@/app/components/FormSkeleton";
import { RootState, AppDispatch } from "@/app/redux/store";

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
  const dispatch = useDispatch<AppDispatch>();
  const { error } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (error) {
      setErrors({ general: error });
    }
  }, [error]);

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

    const payload = {
      otp: formData.code,
      phone_number: formData.phone_number,
      first_name: formData.firstName,
      last_name: formData.lastName,
      password: formData.password,
      confirm_password: formData.confirmPassword,
    };

    const resultAction = await dispatch(completeSignUp(payload));
    if (completeSignUp.fulfilled.match(resultAction)) {
      setMessage("Verification successful. Redirecting...");
      setTimeout(() => {
        router.push('/auth/sign-in');
      }, 2000); 
    } else {
      setErrors({ general: resultAction.payload as string });
    }
  };

  const handleResend = async () => {
    const payload = {
      phone_number: formData.phone_number,
      operation_type: "WHATSAPP VERIFICATION",
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
      id: "phone_number",
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
      {message && (
        <div className="text-green-500 mt-4">
          {message}
        </div>
      )}
    </Suspense>
  );
};

export default CompleteSignUp;
