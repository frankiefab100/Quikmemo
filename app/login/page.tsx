import Image from "next/image";
import { redirect } from "next/navigation";
import { getSession } from "../../lib/getSession";
import Button from "./button";
import { signIn } from "@/auth";
import { Github, Google, Twitter } from "@/assets/SocialIcons";

const LoginPage = async () => {
  const session = await getSession();
  const user = session?.user;
  if (user) redirect("/dashboard");

  return (
    <main className="w-full h-screen flex flex-col items-center justify-center px-4">
      <div className="max-w-sm w-full text-gray-600">
        <div className="text-center">
          <Image
            src="/quikmemo-mark.svg"
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
        <form
          // action={signInUser}

          className="mt-8 space-y-5"
        >
          <div>
            <label className="font-medium">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              required
              className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-blue-600 shadow-sm rounded-lg"
            />
          </div>
          <div>
            <label className="font-medium">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              required
              className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-blue-600 shadow-sm rounded-lg"
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-3 text-white font-medium bg-blue-600 hover:bg-blue-500 active:bg-blue-600 rounded-lg duration-150"
          >
            Sign in
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
