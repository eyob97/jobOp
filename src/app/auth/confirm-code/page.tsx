"use client";

import FormSkeleton, { Field } from '@/app/components/FormSkeleton';
import React, { useState } from 'react';

const ConfirmCode: React.FC = () => {
  const [code, setCode] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const fields: Field[] = [
    {
      id: 'code',
      label: 'Confirmation Code',
      type: 'text',
      placeholder: 'Enter the 6-digit code',
      value: code,
      required: true,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => setCode(e.target.value),
    },
  ];

  return (
    <FormSkeleton
      title="Confirm Code"
      subtitle="Enter the confirmation code sent to your email"
      fields={fields}
      buttonText="Confirm"
      onSubmit={handleSubmit}
    />
  );
};

export default ConfirmCode;
