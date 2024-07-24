import React from 'react';
import { Button } from 'flowbite-react';

interface CustomButtonProps {
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  children: React.ReactNode;
}

const CustomButton: React.FC<CustomButtonProps> = ({ type = "button", onClick, children }) => {
  return (
    <Button
      type={type}
      onClick={onClick}
      className="rounded-full text-black"
      style={{ backgroundColor: "#FFC424", color: "#000" }}
    >
      {children}
    </Button>
  );
};

export default CustomButton;
