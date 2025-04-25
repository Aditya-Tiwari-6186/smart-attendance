"use client";

import { useEffect } from "react";

export default function FacultyLoginPage() {
  useEffect(() => {
    document.title = "Login Page";
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-white to-violet-600 px-4">
      <h1 className="text-4xl font-bold text-violet-700 mb-6">Login Page</h1>
      
      <div className="bg-white p-8 rounded-2xl shadow-md text-center max-w-md w-full">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Admin Section
        </h2>
        <p className="text-gray-600 text-lg">
          🚧 Not created yet. Coming soon!
        </p>
      </div>
    </div>
  );
}
