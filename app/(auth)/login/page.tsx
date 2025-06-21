"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Button from "./button";
import { Github, Google, Twitter } from "@/assets/SocialIcons";
import Input from "@/components/ui/Input";
import { signInAction } from "@/actions/authActions";
import { useForm } from "react-hook-form";
import { signInSchema, type SignInValues } from "@/lib/formSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { Metadata } from "next";

const metadata: Metadata = {
  title: "Login to Quikmemo | Access Your Notes Anytime",
  description: "Sign in to Quikmemo to access your notes and stay productive.",
};

const LoginPage: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInValues>({
    resolver: zodResolver(signInSchema),
  });

  const togglePasswordVisibility = () => {
    setIsVisible((prev) => !prev);
  };

  const onSubmit = async (data: SignInValues) => {
    const res = await signInAction(data);
    if (res?.error) {
      alert(res.error);
      return;
    }
    //  Simulate authentication
    setTimeout(() => {
      // setIsLoading(false);
      router.push("/dashboard");
    }, 1000);
  };

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
              Log in to your account
            </h3>
            <p className="">
              Don&apos;t have an account?{" "}
              <Link
                href="/register"
                className="font-medium text-blue-600 hover:text-blue-500"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-5">
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
              autoComplete="current-password"
              error={errors.password?.message}
            />
            <button
              onClick={togglePasswordVisibility}
              className="absolute right-3 top-10 cursor-pointer"
            >
              {isVisible ? <EyeIcon /> : <EyeOffIcon />}
            </button>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="remember"
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
              />
              <label htmlFor="remember" className="text-sm text-gray-600">
                Remember me
              </label>
            </div>
            <Link
              href="/forgot-password"
              className="text-sm font-medium text-blue-600 hover:text-blue-500"
            >
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full px-4 py-3 text-white font-medium bg-blue-600 hover:bg-blue-500 active:bg-blue-600 rounded-lg duration-150 disabled:bg-blue-300"
          >
            {isSubmitting ? "Logging in..." : "Sign in"}
          </button>
        </form>

        <div className="flex flex-col gap-4 mt-8">
          <div className="relative">
            <span className="block w-full h-px bg-gray-300"></span>
            <p className="inline-block w-fit text-sm bg-white px-2 absolute -top-2 inset-x-0 mx-auto">
              Or continue with
            </p>
          </div>
          <Button provider="google" text="Continue with Google" Icon={Google} />
          <Button provider="github" text="Continue with GitHub" Icon={Github} />
          {/* <Button
            provider="twitter"
            text="Continue with Twitter"
            Icon={Twitter}
          /> */}
        </div>
      </div>
    </main>
  );
};

export default LoginPage;
