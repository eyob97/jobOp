"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import dynamic from "next/dynamic";
import { verifyCompleteSignUp, sendOTP } from "@/app/redux/authSlice";
import { RootState, AppDispatch } from "@/app/redux/store";
import { Field } from "@/app/components/LandingPage/FormSkeleton";
import { CountryDropdown } from "react-country-region-selector";

const FormSkeleton = dynamic(() => import('@/app/components/LandingPage/FormSkeleton'), {
  ssr: false,
  loading: () => <div>Loading...</div>,
});

interface FormErrors {
  code?: string;
  general?: string;
  first_name?: string;
  last_name?: string;
  phone_number?: string;
  password?: string;
  confirm_password?: string;
  company_name?: string;
  location?: string;
}

const CompleteSignUp = () => {
  const [formData, setFormData] = useState({
    code: "",
    firstName: "",
    lastName: "",
    password: "",
    confirmPassword: "",
    phone_number: "",
    companyName: "",
    location: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [message, setMessage] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useDispatch<AppDispatch>();
  const { error } = useSelector((state: RootState) => state.auth);

  const userType = searchParams.get("userType");

  useEffect(() => {
    if (error) {
      setErrors({ general: error });
      console.error("Auth error:", error);
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

  const handleLocationChange = (val: string) => {
    setFormData({
      ...formData,
      location: val,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setMessage("");

    const payload = userType === "Employer"
      ? {
          otp: formData.code,
          phone_number: formData.phone_number,
          first_name: formData.firstName,
          last_name: formData.lastName,
          company_name: formData.companyName,
          location: formData.location,
          password: formData.password,
          confirm_password: formData.confirmPassword,
        }
      : {
          otp: formData.code,
          phone_number: formData.phone_number,
          first_name: formData.firstName,
          last_name: formData.lastName,
          password: formData.password,
          confirm_password: formData.confirmPassword,
        };

    try {
      const resultAction = await dispatch(verifyCompleteSignUp(payload));
      if (verifyCompleteSignUp.fulfilled.match(resultAction)) {
        setMessage("Verification successful. Redirecting...");
        setTimeout(() => {
          router.push('/auth/sign-in');
        }, 2000);
      } else {
        const errorPayload = resultAction.payload as any;
        console.error("Error payload:", errorPayload);

        const normalizedErrors: FormErrors = {};
        if (errorPayload.otp) {
          normalizedErrors.code = "Invalid OTP. Please check and try again.";
        } else {
          Object.keys(errorPayload).forEach((key) => {
            if (Array.isArray(errorPayload[key])) {
              normalizedErrors[key as keyof FormErrors] = errorPayload[key][0];
            } else {
              normalizedErrors[key as keyof FormErrors] = errorPayload[key];
            }
          });
        }

        setErrors(normalizedErrors);
      }
    } catch (error) {
      console.error("Submit error:", error);
      setErrors({ general: "An unexpected error occurred. Please try again later." });
    }
  };

  const handleResend = async () => {
    const payload = {
      phone_number: formData.phone_number,
      operation_type: "WHATSAPP VERIFICATION",
    };

    try {
      const resultAction = await dispatch(sendOTP(payload));
      if (sendOTP.fulfilled.match(resultAction)) {
        setMessage('OTP sent successfully.');
      } else {
        const resendError = resultAction.payload as any;
        if (resendError?.user) {
          setErrors({ general: "User already exists. Please sign in." });
        } else {
          setMessage(resendError as string);
        }
        console.error("Resend error:", resendError);
      }
    } catch (error) {
      console.error("Resend OTP error:", error);
      setMessage("Failed to send OTP. Please try again later.");
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

  if (userType === "Employer") {
    fields.push(
      {
        id: "companyName",
        label: "Company Name",
        type: "text",
        placeholder: "Company name",
        value: formData.companyName,
        required: true,
        onChange: handleChange,
        error: errors.company_name,
      },
      {
        id: "location",
        label: "Location",
        type: "custom",
        placeholder: "Select your country",
        value: formData.location,
        required: true,
        onChange: handleLocationChange,
        error: errors.location,
        customComponent: (
          <CountryDropdown
            value={formData.location}
            onChange={(val) => handleLocationChange(val)}
            classes="form-control"
          />
        ),
      }
    );
  }

  return (
    <div>
      <FormSkeleton
        title="Complete your account"
        subtitle={
          <span>
            Provide the code we just sent to your phone <br />
            Didn’t get a code?{" "}
            <a href="#" className="text-[#116034] bold-text" onClick={handleResend}>
              Send again
            </a>
            <br />
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
    </div>
  );
};

export default CompleteSignUp;
