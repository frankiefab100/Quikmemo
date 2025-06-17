import Input from "@/components/ui/Input";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reset Your Quikmemo Password",
  description:
    "Forgot your password? Easily reset it and regain access to your Quikmemo account.",
};

const ForgotPassword: React.FC = () => {
  return (
    <main className="w-full h-screen flex flex-col items-center justify-center px-4">
      <div className="max-w-sm w-full text-gray-600">
        <div className="text-center">
          <Image
            src="/icons/quikmemo-mark-logo.svg"
            className="mx-auto"
            alt="Quikmemo logo"
            width={50}
            height={50}
          />
          <div className="mt-5 space-y-2">
            <h3 className="text-gray-800 text-2xl font-bold sm:text-3xl">
              Forgot your password?
            </h3>
            <p className="text-sm">
              Enter your email and we will send you a code to reset your
              password!
            </p>
            <p className="text-sm">
              Remember your password?{" "}
              <Link
                href="/login"
                className="font-medium text-blue-600 hover:text-blue-500"
              >
                Log in
              </Link>
            </p>
          </div>
        </div>

        <form className="mt-8 space-y-5">
          <Input
            label="Email"
            type="email"
            id="email"
            placeholder="name@example.com"
            required
          />

          <button
            type="submit"
            className="w-full px-4 py-3 text-white font-medium bg-blue-600 hover:bg-blue-500 active:bg-blue-600 rounded-lg duration-150 disabled:bg-blue-300"
          >
            Send Reset Code
          </button>
        </form>
      </div>
    </main>
  );
};

export default ForgotPassword;
