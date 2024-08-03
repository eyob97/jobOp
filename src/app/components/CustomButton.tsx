import React from 'react';
import { Button } from 'flowbite-react';

interface CustomButtonProps {
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  children: React.ReactNode;
  disabled?: boolean; 
}

const CustomButton: React.FC<CustomButtonProps> = ({ type = "button", onClick, children, disabled }) => {
  return (
    <Button
      type={type}
      onClick={onClick}
      className={`rounded-full text-black ${disabled ? 'bg-gray-400' : 'bg-yellow-500'}`}
      style={{
        backgroundColor: disabled ? "#d3d3d3" : "#FFC424",
        color: disabled ? "#7d7d7d" : "#000",
        cursor: disabled ? "not-allowed" : "pointer"
      }}
      disabled={disabled}
    >
      {children}
    </Button>
  );
};

export default CustomButton;
