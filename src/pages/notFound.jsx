// 404.js
import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-black">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-gray-800 animate-bounce">404</h1>
        <h2 className="text-3xl font-semibold mt-4 text-gray-600">Page Not Found</h2>
        <p className="text-lg mt-2 text-gray-500">Sorry, the Link you're looking for doesn't exist.</p>
       <Link to="/" ><p className="mt-6 inline-block bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition-all duration-300 ease-in-out">
          Go back to Home
        </p>
        </Link>  
      </div>
    </div>
  );
};

export default NotFoundPage;
