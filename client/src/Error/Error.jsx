import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center bg-gray-100 px-6">
      <h1 className="text-9xl font-bold text-purple-600">404</h1>

      <h2 className="text-3xl font-semibold mt-4">Oops! Page Not Found</h2>

      <p className="text-gray-600 mt-2 max-w-md">
        The page you're looking for doesn't exist or has been moved.
      </p>

      <button
        onClick={() => navigate("/")}
        className="mt-6 bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg transition-all"
      >
        Go Home
      </button>
    </div>
  );
}
