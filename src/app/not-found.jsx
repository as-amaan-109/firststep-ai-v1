'use client';

import Link from 'next/link';
import { Home } from 'lucide-react';

const NotFoundPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-white to-purple-100">
      <div className="text-center">
        <h1 className="text-9xl font-extrabold text-purple-600">404</h1>
        <p className="mt-4 text-lg text-gray-700">
          Oops! The page you are looking for does not exist.
        </p>
        <p className="text-sm text-gray-500">
          But don’t worry, you can head back to the homepage.
        </p>

        <div className="mt-6">
          <Link
            href="/"
            className="inline-flex items-center px-6 py-3 text-white bg-purple-600 hover:bg-purple-700 rounded-lg shadow-md transition-all duration-200"
          >
            <Home className="w-5 h-5 mr-2" />
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
