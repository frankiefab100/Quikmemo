import { signInUser } from "@/actions/user";

interface ButtonProps {
  provider: "google" | "github" | "twitter";
  Icon: React.ComponentType;
}

const Button: React.FC<ButtonProps> = ({ provider, Icon }) => {
  return (
    <button
      type="button"
      onClick={signInUser.bind(null, provider)}
      className="flex items-center justify-center py-2.5 border rounded-lg hover:bg-gray-50 duration-150 active:bg-gray-100"
    >
      <Icon />
    </button>
  );
};

export default Button;
