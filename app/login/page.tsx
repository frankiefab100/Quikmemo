"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Button from "./button";
import { Github, Google, Twitter } from "@/assets/SocialIcons";
import Input from "@/components/ui/Input";
import { signInAction } from "@/actions/user";
import { useForm } from "react-hook-form";
import { signInSchema, type SignInValues } from "@/lib/formSchema";
import { zodResolver } from "@hookform/resolvers/zod";

const LoginPage = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInValues>({
    resolver: zodResolver(signInSchema),
  });

  const onSubmit = async (data: SignInValues) => {
    const res = await signInAction(data);
    if (res.error) {
      alert(res.error);
      return;
    }
    router.push("/dashboard");
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
              <a
                href="/register"
                className="font-medium text-blue-600 hover:text-blue-500"
              >
                Sign up
              </a>
            </p>
          </div>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-5">
          <div>
            <Input
              label="Email"
              type="email"
              id="email"
              {...register("email")}
              error={errors.email?.message}
            />
          </div>
          <div>
            <Input
              label="Password"
              type="password"
              id="password"
              {...register("password")}
              error={errors.password?.message}
            />
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
          <Button
            provider="twitter"
            text="Continue with Twitter"
            Icon={Twitter}
          />
        </div>
      </div>
    </main>
  );
};

export default LoginPage;
