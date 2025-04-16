import Input from "@/components/ui/Input";
import Image from "next/image";

const page = () => {
  return (
    <main className="w-full h-screen flex flex-col items-center justify-center">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <Image
          src="/icons/quikmemo-mark-logo.svg"
          className="mx-auto py-3"
          alt="Quikmemo logo"
          width={50}
          height={50}
        />
        <div className="max-w-sm w-full p-6 bg-white rounded-lg shadow md:mt-0 sm:max-w-mdsm:p-8">
          <h1 className="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
            Forgot your password?
          </h1>
          <p className="font-light text-gray-600 0">
            Enter your email and we will send you a code to reset your password!
          </p>
          <form className="mt-4 space-y-4 lg:mt-5 md:space-y-5">
            <Input
              label="Email"
              type="email"
              id="email"
              placeholder="name@example.com"
            />
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  required
                  id="terms"
                  aria-describedby="terms"
                  type="checkbox"
                  className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300"
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="terms" className="font-light text-gray-600">
                  I accept the{" "}
                  <a
                    className="font-medium text-blue-600 hover:underline"
                    href="#"
                  >
                    Terms and Conditions
                  </a>
                </label>
              </div>
            </div>
            <button
              type="submit"
              className="w-full px-4 py-3 text-white font-medium bg-blue-600 hover:bg-blue-500 active:bg-blue-600 rounded-lg duration-150 disabled:bg-blue-300"
            >
              Reset password
            </button>
          </form>
        </div>
      </div>
    </main>
  );
};

export default page;
