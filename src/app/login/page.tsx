"use client";

import LoginForm from "@/components/forms/LoginForm";  // Formulario de login
export default function LoginPage() {

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <LoginForm/>
      </div>
    </div>
  );
}
