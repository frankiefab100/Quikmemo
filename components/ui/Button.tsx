import { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline";
  children: ReactNode;
}

const Button = ({ variant = "primary", children, ...props }: ButtonProps) => {
  const baseStyles =
    "flex items-center justify-center py-2 px-4 rounded-lg focus:outline-none transition duration-150";

  const variants = {
    primary:
      "px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg active:bg-blue-600 focus:ring-blue-200 hover:bg-blue-800",
    secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300 active:bg-gray-400",
    outline:
      "bg-transparent dark:text-blue-400 px-5 py-2.5 text-sm font-medium rounded-lg text-center text-blue-800 border border-blue-500 hover:text-white hover:border-transparent hover:bg-red-700",
  };

  return (
    <button className={`${baseStyles} ${variants[variant]}`} {...props}>
      {children}
    </button>
  );
};

export default Button;

// export function renderButtonStyle(type: string) {
// 	switch (type) {
// 		case "primary":
// 			return "px-8 py-3 text-lg font-semibold rounded dark:bg-violet-400 dark:text-gray-900";
// 		case "secondary":
// 			return "px-8 py-3 text-lg font-semibold border rounded dark:border-gray-100";
// 		default:
// 			return "px-8 py-3 text-lg font-semibold rounded dark:bg-violet-400 dark:text-gray-900";
// 	}
// }
