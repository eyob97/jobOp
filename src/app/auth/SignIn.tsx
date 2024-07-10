'use client';
import React, { useState } from 'react';
import FormSkeleton from '../components/FormSkeleton';

const SignIn: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const fields = [
    {
      id: 'email',
      label: 'Email',
      type: 'email',
      placeholder: 'name@flowbite.com',
      value: email,
      required: true,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value),
    },
    {
      id: 'password',
      label: 'Password',
      type: 'password',
      placeholder: 'Password',
      value: password,
      required: true,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value),
    },
  ];

  return (
    <FormSkeleton
      title="Sign In"
      subtitle="Access your account"
      fields={fields}
      buttonText="Sign In"
      onSubmit={handleSubmit}
    />
  );
};

export default SignIn;
