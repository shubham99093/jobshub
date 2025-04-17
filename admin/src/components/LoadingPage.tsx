const LoadingPage = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="flex flex-col items-center">
        {/* Spinner */}
        <div className="w-16 h-16 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>

        {/* Loading Text */}
        <p className="mt-4 text-lg text-gray-600 font-semibold">
          Loading, please wait...
        </p>
      </div>
    </div>
  );
};

export default LoadingPage;
