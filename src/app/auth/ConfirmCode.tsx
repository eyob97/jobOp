import React, { useState } from 'react';
import FormSkeleton from '../components/FormSkeleton';

const ConfirmCode: React.FC = () => {
  const [code, setCode] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const fields = [
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
