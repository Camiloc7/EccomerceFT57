"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const [isMounted, setIsMounted] = useState(false); 
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const redirectToProducts = () => {
    if (isMounted) {
      router.push("/products");
    }
  };

  if (!isMounted) return null;

  return (
    <main className="text-center p-10">
      <h1 className="text-4xl font-bold text-red-600">404 - Página No Encontrada</h1>
      <p className="mt-4 text-lg text-gray-600">
        Lo sentimos, la página que buscas no existe.
      </p>
      <button
        onClick={redirectToProducts}
        className="mt-6 px-6 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
      >
        Volver a Productos
      </button>
    </main>
  );
}
