'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import FormSkeleton from '../components/FormSkeleton';
import Link from 'next/link';

const SignInPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
    router.push('/');
  };

  const fields = [
    {
      id: 'email',
      label: 'Email',
      type: 'email',
      placeholder: 'email@gmail.com',
      value: formData.email,
      required: true,
      onChange: handleChange,
    },
    {
      id: 'password',
      label: 'Password',
      type: 'password',
      placeholder: 'Password',
      value: formData.password,
      required: true,
      onChange: handleChange,
    },
  ];

  return (
    <FormSkeleton
      title="Sign In"
      subtitle={
        <span>
        Don't have an account?{" "}
          <Link href="/sign-up" legacyBehavior>
            <a className="text-[#116034] bold-text">Sign up</a>
          </Link>
        </span>
      }
      fields={fields}
      buttonText="Sign In"
      onSubmit={handleSubmit}
      showCheckbox={false}
    />
  );
};

export default SignInPage;
