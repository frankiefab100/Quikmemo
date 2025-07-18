"use client";
import Image from "next/image";
import Avatars from "@/components/Avatars";
import Input from "@/components/ui/Input";
import { signUpSchema, type SignUpValues } from "@/lib/formSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { Metadata } from "next";
import { useState } from "react";
import Link from "next/link";
import { register as registerAction } from "@/actions/register.action";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { SignUpOAuth } from "../../../components/auth/SignUpAuthButtons";
import Logo from "../../../assets/logo/quikmemo-full-lockup-logo-white.svg";

const metadata: Metadata = {
  title: "Register for Quikmemo | Quick and Easy Note-Taking",
  description:
    "Join Quikmemo today! Create your account and start organizing your thoughts effortlessly.",
};

const RegisterPage = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpValues>({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = async (data: SignUpValues) => {
    setErrorMsg(null);
    setSuccessMsg(null);

    const result = await registerAction(data);
    if (result.error) {
      setErrorMsg(result.error);
    } else if (result.success) {
      setSuccessMsg(result.success);
    }
  };

  const togglePasswordVisibility = () => {
    setIsVisible((prev) => !prev);
  };

  return (
    <main className="w-full flex">
      <div className="relative flex-1 hidden items-center justify-center h-screen bg-gray-900 lg:flex">
        <div className="relative z-10 w-full max-w-md">
          <Image src={Logo} alt="Quikmemo logo" width={150} height={150} />
          <div className=" mt-16 space-y-3">
            <h3 className="text-white text-3xl font-bold">
              Start your documentation journey
            </h3>
            <p className="text-gray-300">
              Create an account to organize your thoughts, ideas, and enhance
              your productivity.
            </p>
            <div className="flex items-center -space-x-2 overflow-hidden">
              <Avatars />
              <p className="text-sm text-gray-400 font-medium translate-x-5">
                Join 50+ users
              </p>
            </div>
          </div>
        </div>
        <div
          className="absolute inset-0 my-auto h-[500px]"
          style={{
            background:
              "linear-gradient(152.92deg, rgba(192, 132, 252, 0.2) 4.54%, rgba(232, 121, 249, 0.26) 34.2%, rgba(192, 132, 252, 0.1) 77.55%)",
            filter: "blur(118px)",
          }}
        ></div>
      </div>
      <div className="flex-1 flex items-center justify-center h-screen">
        <div className="w-full max-w-md space-y-8 px-4 bg-white text-gray-600 sm:px-0">
          <div className="text-left">
            <Image src={Logo} alt="Quikmemo logo" width={180} height={180} />
            <div className="mt-5 space-y-2">
              <h3 className="text-gray-800 text-2xl font-bold sm:text-3xl">
                Sign up
              </h3>
              <p className="">
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="font-medium text-blue-600 hover:text-blue-500"
                >
                  Log in
                </Link>
              </p>
            </div>
          </div>
          {/* Error and success message display */}
          {errorMsg && (
            <div className="bg-red-100 text-red-700 px-4 py-2 rounded mb-4 text-center">
              {errorMsg}
            </div>
          )}
          {successMsg && (
            <div className="bg-green-100 text-green-700 px-4 py-2 rounded mb-4 text-center">
              {successMsg}
            </div>
          )}

          <SignUpOAuth />
          <div className="relative">
            <span className="block w-full h-px bg-gray-300"></span>
            <p className="inline-block w-fit text-sm bg-white px-2 absolute -top-2 inset-x-0 mx-auto">
              Or continue with
            </p>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
              <Input
                label="First Name"
                type="text"
                id="firstName"
                {...register("firstName")}
                error={errors.firstName?.message}
              />
              <Input
                label="Last Name"
                type="text"
                id="lastName"
                {...register("lastName")}
                error={errors.lastName?.message}
              />
            </div>
            <Input
              label="Email"
              type="email"
              id="email"
              {...register("email")}
              error={errors.email?.message}
            />
            <div className="relative">
              <Input
                label="Password"
                type={isVisible ? "text" : "password"}
                id="password"
                {...register("password")}
                name="password"
                error={
                  errors.password?.message &&
                  "Password must be 8-32 characters long and contain at least one letter and one number"
                }
              />
              <button
                onClick={togglePasswordVisibility}
                className="absolute right-3 top-10 cursor-pointer"
                type="button"
              >
                {isVisible ? <EyeIcon /> : <EyeOffIcon />}
              </button>
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full px-4 py-3 text-white font-medium bg-blue-600 hover:bg-blue-500 active:bg-blue-600 rounded-lg duration-150 disabled:bg-blue-300 flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Creating account...
                </>
              ) : (
                "Create an account"
              )}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
};

export default RegisterPage;
