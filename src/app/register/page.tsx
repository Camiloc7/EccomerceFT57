"use client";

import RegisterForm from "@/components/forms/RegisterForm";

export default function RegisterPage() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 relative">
      <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white py-16 px-8 text-center rounded-lg w-full z-10">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">AppleCore</h1>
      </div>
      <div className="bg-white p-8 rounded-lg shadow-md w-960 mt-32 z-20">
        <RegisterForm />
      </div>
    </div>
  );
}
