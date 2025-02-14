const CTA: React.FC = () => {
  return (
    <div className="text-center">
      <h2 className="md:text-3xl text-2xl font-extrabold text-gray-900">
        Ready to Get Started?
      </h2>
      <p className="my-4 text-lg text-gray-500">
        Join thousands of users who are already experiencing the future of
        note-taking.
      </p>
      <button className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
        Get Started - It&apos;s Free
      </button>
    </div>
  );
};

export default CTA;
