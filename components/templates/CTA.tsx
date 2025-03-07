import Link from "next/link";

const CTA: React.FC = () => {
  return (
    <div className="bg-[#f7f9ff] max-w-5xl mx-auto overflow-hidden rounded-xl">
      <div className="py-16 mx-auto text-center">
        <h3 className="text-2xl font-bold text-gray-900">
          Try Quikmemo for free today
        </h3>
        <p className="my-2 text-base font-normal text-gray-600">
          Transform your thoughts into organized notes effortlessly.
        </p>
        <div className="mt-8">
          <Link
            href="/login"
            title="Get Started for free"
            className="px-6 py-4 font-semibold text-white  bg-blue-600 rounded-md hover:bg-blue-700 transition-all duration-200"
          >
            Start Writing – It&apos;s free
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CTA;
