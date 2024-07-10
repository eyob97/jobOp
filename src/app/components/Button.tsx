import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ children, className, ...props }) => {
  return (
    <button
      className={`w-[377px] h-[52px] rounded-[35px] py-[10px] px-[30px] bg-[#FFC424] ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
