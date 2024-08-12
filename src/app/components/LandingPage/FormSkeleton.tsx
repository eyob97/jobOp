"use client";

import React, { ReactNode, useEffect, useState } from "react";
import { Label, TextInput, Button, Checkbox, Card } from "flowbite-react";
import Select from "react-select";
import Image from "next/image";
import Layout from "../../layout";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import Link from "next/link";

export interface Field {
  id: string;
  label: string;
  type: string;
  placeholder?: string;
  value?: string;
  required?: boolean;
  readonly?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement> | any) => void;
  options?: { value: string; label: string }[];
  error?: string;
  maxLength?: number;
  pattern?: string;
  inputMode?:
    | "search"
    | "text"
    | "none"
    | "tel"
    | "url"
    | "email"
    | "numeric"
    | "decimal";
  customComponent?: React.ReactNode;
}

interface FormSkeletonProps {
  title: string;
  subtitle: React.ReactNode;
  fields: Field[];
  buttonText: string;
  onSubmit: (e: React.FormEvent) => void;
  showCheckbox?: boolean;
  additionalElements?: React.ReactNode;
  generalError?: string;
  showResend?: boolean;
  onResend?: () => void;
  showTabs?: boolean;
  initialTab?: string;
  isResetPassword?: boolean;
}

const FormSkeleton: React.FC<FormSkeletonProps> = ({
  title,
  subtitle,
  fields,
  buttonText,
  onSubmit,
  showCheckbox = false,
  additionalElements,
  generalError,
  showResend = false,
  onResend,
  showTabs = false,
  initialTab = "email",
  isResetPassword = false,
}) => {
  const [tab, setTab] = useState(initialTab);

  useEffect(() => {
    setTab(initialTab);
  }, [initialTab]);

  const updatedFields = isResetPassword
    ? fields.filter((field) => {
        if (tab === "email") {
          return field.id !== "phone";
        }
        return field.id !== "email";
      })
    : fields;

  return (
    <Layout>
      <div className="grid grid-cols-1 md:grid-cols-2 h-screen">
        <div className="hidden md:block relative">
          <Image
            src="/landing_assets/images/Frame 4.svg"
            alt="Form image"
            fill
            objectFit="cover"
            className="absolute inset-0 w-full h-full"
            // loading="lazy"
            quality={50}
            placeholder="blur"
            blurDataURL="/landing_assets/images/Frame 4.svg"
            priority
          />
        </div>
        <div className="flex items-start justify-center p-4 md:p-8 overflow-auto">
          <Card className="w-full max-w-md bg-white p-6 shadow-md rounded-2xl">
            <h2 className="text-4xl font-bold mb-2">{title}</h2>
            <p className="text-base font-normal text-gray-500 mb-4">
              {subtitle}
            </p>
            {showTabs && isResetPassword && (
              <div className="flex mb-4">
                <button
                  className={`px-4 py-2 text-sm ${
                    tab === "email"
                      ? "text-white bg-green-500"
                      : "text-green-500"
                  } rounded-l`}
                  onClick={() => setTab("email")}
                >
                  Email
                </button>
                <button
                  className={`px-4 py-2 text-sm ${
                    tab === "phone"
                      ? "text-white bg-green-500"
                      : "text-green-500"
                  } rounded-r`}
                  onClick={() => setTab("phone")}
                >
                  Phone
                </button>
              </div>
            )}
            {additionalElements}
            {generalError && (
              <div className="text-red-500 mb-4">
                {generalError}
                {showResend && (
                  <div>
                    <br />
                    Didn’t get a code?{" "}
                    <a
                      href="#"
                      className="text-[#116034] bold-text"
                      onClick={onResend}
                    >
                      Send again
                    </a>
                  </div>
                )}
              </div>
            )}
            <form onSubmit={onSubmit} className="flex flex-col gap-4">
              {updatedFields.map((field) => (
                <div key={field.id}>
                  <div className="mb-2 block">
                    <Label
                      htmlFor={field.id}
                      className="font-bold text-gray-700"
                    >
                      {field.label}
                    </Label>
                  </div>
                  {field.customComponent ? (
                    field.customComponent
                  ) : field.type === "select" ? (
                    <Select
                      id={field.id}
                      options={field.options}
                      value={field.options?.find(
                        (option) => option.value === field.value
                      )}
                      onChange={field.onChange}
                      placeholder={field.placeholder}
                      className="w-full bg-white rounded-2xl"
                    />
                  ) : field.type === "phone" ? (
                    <>
                      <PhoneInput
                        country={"us"}
                        value={field.value}
                        onChange={field.onChange}
                        inputStyle={{
                          width: "100%",
                          color: "black",
                          borderRadius: "1rem",
                          borderColor: field.error ? "red" : undefined,
                        }}
                        dropdownStyle={{
                          backgroundColor: "white",
                          color: "black",
                        }}
                      />
                      {field.error && (
                        <p className="mt-1 text-sm text-red-500">
                          {field.error}
                        </p>
                      )}
                    </>
                  ) : (
                    <>
                      <TextInput
                        id={field.id}
                        type={field.type}
                        placeholder={field.placeholder}
                        value={field.value}
                        onChange={field.onChange}
                        required={field.required}
                        readOnly={field.readonly}
                        maxLength={field.maxLength}
                        pattern={field.pattern}
                        inputMode={field.inputMode}
                        className={`w-full bg-white rounded-2xl border ${
                          field.error ? "border-red-500" : "border-gray-300"
                        }`}
                      />
                      {field.error && (
                        <p className="mt-1 text-sm text-red-500">
                          {field.error}
                        </p>
                      )}
                    </>
                  )}
                </div>
              ))}
              {showCheckbox && (
                <div className="flex items-center gap-2">
                  <Checkbox id="remember" />
                  <Label htmlFor="remember">Remember me</Label>
                </div>
              )}
              <Button
                type="submit"
                className="w-full rounded-full text-black"
                style={{ backgroundColor: "#FFC424", color: "#000" }}
              >
                {buttonText}
              </Button>
            </form>
            {/* <Link href="/" legacyBehavior>
              <a className="mt-4 px-6 py-2 text-green-600 bg-gray-50 rounded-full hover:bg-white-700">
                Go to home
              </a>
            </Link> */}
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default FormSkeleton;
