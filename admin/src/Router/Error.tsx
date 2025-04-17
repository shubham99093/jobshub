import { Link } from "react-router-dom";

const Error = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-100 text-gray-900">
      <h1 className="text-8xl font-bold">404</h1>
      <p className="text-2xl mt-4">Oops! Page not found.</p>
      <Link
        to="/"
        className="mt-6 px-6 py-3 bg-blue-600 text-white text-lg font-semibold rounded-lg hover:bg-blue-700 transition"
      >
        Go Home
      </Link>
    </div>
  );
};

export default Error;
