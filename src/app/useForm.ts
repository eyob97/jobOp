import { useState } from "react";

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
}

const useForm = (initialValues: FormData) => {
  const [formData, setFormData] = useState<FormData>(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});

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

  return {
    formData,
    setFormData,
    errors,
    setErrors,
    handleChange,
    handleLocationChange,
    handlePhoneNumberChange,
  };
};

export default useForm;
