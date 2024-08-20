"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import FormSkeleton, { Field } from "@/app/components/LandingPage/FormSkeleton";
import PhoneNumberDialog from "@/app/components/PhoneNumberDialog";
import "react-phone-input-2/lib/style.css";
import { Button } from "flowbite-react";
import Link from "next/link";
import { signUpUser } from "@/app/redux/authSlice";
import { AppDispatch, RootState } from "@/app/redux/store";

interface FormData {
  firstName: string;
  lastName: string;
  companyName: string;
  location: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  userType: string;
}

interface FormErrors {
  general?: string;
  first_name?: string;
  last_name?: string;
  company_name?: string;
  work_email?: string;
  email?: string;
  location?: string;
  phone_number?: string;
  password?: string;
  confirm_password?: string;
  user_type?: string;
}

const countryOptions = [
  { value: "poland", label: "Poland" },
  { value: "usa", label: "USA" },
  { value: "germany", label: "Germany" },
];

const SignUpPage = () => {
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    companyName: "",
    location: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    userType: "Employer",
  });
  const [isPhoneDialogOpen, setPhoneDialogOpen] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { isLoading, error } = useSelector(
    (state: RootState) => state.auth || { error: null, isLoading: false }
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }
  useEffect(() => {
    if (error) {
      setErrors({ general: error });
    }
  }, [error]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleLocationChange = (selectedOption: any) => {
    setFormData({
      ...formData,
      location: selectedOption?.value || "",
    });
  };
  const handlePhoneNumberChange = (value: string) => {
    setFormData({
      ...formData,
      phone: `+${value}`,
    });
  };
  const handlePhoneNumberSubmit = async (
    phoneNumber: string,
    userType: string
  ) => {
    try {
      const payload = {
        phone_number: phoneNumber,
        user_type: userType,
      };

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/signup/whatsapp/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (response.ok) {
        router.push(
          `/auth/complete-signup?phone=${phoneNumber}&userType=${userType}`
        );
      } else {
        const errorData = await response.json();
        console.error("Error initiating WhatsApp sign-up:", errorData);
        throw new Error("Failed to initiate WhatsApp sign-up.");
      }
    } catch (err) {
      throw new Error("Failed to initiate WhatsApp sign-up.");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      first_name: formData.firstName,
      last_name: formData.lastName,
      company_name:
        formData.userType === "Employer" ? formData.companyName : undefined,
      location: formData.location,
      work_email: formData.userType === "Employer" ? formData.email : undefined,
      email: formData.userType !== "Employer" ? formData.email : undefined,
      phone_number: formData.phone,
      user_type: formData.userType,
      password: formData.password,
      confirm_password: formData.confirmPassword,
    };

    const resultAction = await dispatch(signUpUser(payload));
    if (signUpUser.fulfilled.match(resultAction)) {
      setSuccessMessage(
        "Account created successfully. Check your email for verification code."
      );
      router.push(`/auth/confirm-code?email=${formData.email}`);
    } else {
      const payload = resultAction.payload as any;
      const normalizedErrors: FormErrors = {};
      Object.keys(payload).forEach((key) => {
        normalizedErrors[key as keyof FormErrors] = Array.isArray(payload[key])
          ? payload[key][0]
          : payload[key];
      });

      setErrors(normalizedErrors);
    }
  };

  const fields: Field[] = [
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
      id: "location",
      label: "Location",
      type: "select",
      placeholder: "Select your country",
      value: formData.location,
      required: formData.userType === "Employer",
      onChange: handleLocationChange,
      options: countryOptions,
      error: errors.location,
    },
    {
      id: "email",
      label: "Email",
      type: "email",
      placeholder: "name@gmail.com",
      value: formData.email,
      required: true,
      onChange: handleChange,
      error: errors.email || errors.work_email,
    },
    {
      id: "phone",
      label: "Phone Number",
      type: "phone",
      placeholder: "+(00)0000000000",
      value: formData.phone,
      required: true,
      onChange: handlePhoneNumberChange,
      error: errors.phone_number,
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
  ];

  if (formData.userType === "Employer") {
    fields.splice(2, 0, {
      id: "companyName",
      label: "Company Name",
      type: "text",
      placeholder: "Company name",
      value: formData.companyName,
      required: true,
      onChange: handleChange,
      error: errors.company_name,
    });
  }

  const additionalElements = (
    <div className="flex flex-col gap-4">
      <Button
        color="primary"
        className="flex items-center justify-center w-full mb-4 border border-gray-300 rounded-full hover:bg-gray-200 transition duration-150"
        onClick={() => setPhoneDialogOpen(true)}
      >
        <img
          src="/landing_assets/images/whatsapp.svg"
          alt="WhatsApp"
          className="mr-2"
        />
        <span className="mt-1 font-medium"> Sign in with WhatsApp</span>
      </Button>
      <p className="text-center">Or</p>
      <div className="flex justify-center gap-4">
        <Button
          color="light"
          className={`rounded-2xl w-full border ${
            formData.userType === "Job Seeker"
              ? "bg-green-500 text-white"
              : "border-gray-300 hover:bg-gray-200"
          } transition duration-150`}
          onClick={() => setFormData({ ...formData, userType: "Job Seeker" })}
        >
          Job Seeker
        </Button>
        <Button
          color="light"
          className={`rounded-2xl w-full border ${
            formData.userType === "Employer"
              ? "bg-green-500 text-white"
              : "border-gray-300 hover:bg-gray-200"
          } transition duration-150`}
          onClick={() => setFormData({ ...formData, userType: "Employer" })}
        >
          Employer
        </Button>
      </div>
    </div>
  );

  return (
    <div>
      <FormSkeleton
        title="Sign Up"
        subtitle={
          <span>
            Already have an account?{" "}
            <Link href="/auth/sign-in" legacyBehavior>
              <a className="text-[#116034] bold-text">Sign in</a>
            </Link>
          </span>
        }
        fields={fields}
        buttonText="Create Free Account"
        onSubmit={handleSubmit}
        showCheckbox={false}
        additionalElements={additionalElements}
      />
      {errors.general && (
        <div className="text-red-500 mt-4">{errors.general}</div>
      )}
      {successMessage && (
        <div className="text-green-500 mt-4">{successMessage}</div>
      )}
      <PhoneNumberDialog
        isOpen={isPhoneDialogOpen}
        onClose={() => setPhoneDialogOpen(false)}
        onSubmit={handlePhoneNumberSubmit}
      />
    </div>
  );
};

export default SignUpPage;
