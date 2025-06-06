import { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline" | "secondary";
  children: ReactNode;
}

const Button = ({ variant = "primary", children, ...props }: ButtonProps) => {
  const baseStyles =
    "flex justify-center items-center text-center text-sm font-medium rounded-md focus:outline-none transition duration-100 cursor-pointer focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-blue-400";

  const variants = {
    primary: "px-5 py-2.5 bg-blue-600 text-white hover:bg-blue-700",
    secondary:
      "px-4 py-1 bg-blue-600 text-white hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed",
    outline:
      "px-4 py-1 bg-transparent text-blue-800 border border-blue-500 hover:text-white hover:border-transparent hover:bg-red-700",
  };

  const variantStyles = variants[variant] || variants.primary;

  return (
    <button className={`${baseStyles} ${variantStyles}`} {...props}>
      {children}
    </button>
  );
};

export default Button;
