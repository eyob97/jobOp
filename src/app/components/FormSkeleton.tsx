"use client";

import React, { ReactNode } from "react";
import { Label, TextInput, Button, Checkbox, Card } from "flowbite-react";
import Select from "react-select";
import Image from "next/image";
import Layout from "../layout";

export interface Field {
  id: string;
  label: string;
  type: string;
  placeholder?: string;
  value?: string;
  required?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement> | any) => void;
  options?: { value: string; label: string }[];
}

interface FormSkeletonProps {
  title: string;
  subtitle: ReactNode;
  fields: Field[];
  buttonText: string;
  onSubmit: (e: React.FormEvent) => void;
  showCheckbox?: boolean;
  additionalElements?: React.ReactNode;
}

const FormSkeleton: React.FC<FormSkeletonProps> = ({
  title,
  subtitle,
  fields,
  buttonText,
  onSubmit,
  showCheckbox = false,
  additionalElements,
}) => {
  return (
    <Layout>
      <div className="grid grid-cols-1 md:grid-cols-2 h-screen">
        <div className="hidden md:block relative w-full h-full">
          <Image
            src="/landing_assets/images/Frame 4.svg"
            alt="Form image"
            layout="fill"
            objectFit="cover"
          />
        </div>
        <div className="flex items-center justify-center p-4">
          <Card className="w-full max-w-md bg-white p-6 shadow-md rounded-2xl">
            <h2 className="text-4xl font-bold mb-2">{title}</h2>
            <p className="text-base font-normal text-gray-500 mb-4">
              {subtitle}
            </p>
            {additionalElements}
            <form onSubmit={onSubmit} className="flex flex-col gap-4">
              {fields.map((field) => (
                <div key={field.id}>
                  <div className="mb-2 block">
                    <Label
                      htmlFor={field.id}
                      className="font-bold text-gray-700"
                    >
                      {field.label}
                    </Label>
                  </div>
                  {field.type === "select" ? (
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
                  ) : (
                    <TextInput
                      id={field.id}
                      type={field.type}
                      placeholder={field.placeholder}
                      value={field.value}
                      onChange={field.onChange}
                      required={field.required}
                      className="w-full bg-white rounded-2xl border border-gray-300"
                    />
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
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default FormSkeleton;
