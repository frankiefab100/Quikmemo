import React from "react";

interface ButtonProps {
  Icon: React.ComponentType;
}

const Button: React.FC<ButtonProps> = ({ Icon }) => {
  return (
    <button
      type="submit"
      className="flex items-center justify-center py-2.5 border rounded-lg hover:bg-gray-50 duration-150 active:bg-gray-100"
    >
      <Icon />
    </button>
  );
};

export default Button;
