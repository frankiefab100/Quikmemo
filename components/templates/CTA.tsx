import Link from "next/link";

const CTA: React.FC = () => {
  return (
    <div className="pb-16 mx-auto text-center">
      <h3 className="text-2xl font-semibold text-gray-900">
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
          Start writing – it&apos;s free
        </Link>
      </div>
    </div>
  );
};

export default CTA;
