"use client";

import React, { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const { user, token, isLoggedIn } = useAuth();
  const [orderCount, setOrderCount] = useState<number | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (!isLoggedIn) {
      alert("Debes iniciar sesión para ver tu perfil.");
      router.push("/login");
      return;
    }

    const fetchOrderCount = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/users/orders`, {
          headers: {
            Authorization: token,
          },
        });

        if (Array.isArray(response.data)) {
          setOrderCount(response.data.length);
        } else {
          setOrderCount(0);
        }
      } catch (error) {
        console.error("Error al obtener los pedidos:", error);
        setOrderCount(0);
      }
    };

    fetchOrderCount();
  }, [isLoggedIn, token, router]);

  if (!user) {
    return <div className="text-center text-lg font-semibold">Cargando información...</div>;
  }

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">Mi Perfil</h2>

      <div className="space-y-4">
        <div className="flex justify-between border-b pb-2">
          <span className="font-semibold text-gray-700">Nombre:</span>
          <span className="text-gray-900">{user.name}</span>
        </div>

        <div className="flex justify-between border-b pb-2">
          <span className="font-semibold text-gray-700">Correo Electrónico:</span>
          <span className="text-gray-900">{user.email}</span>
        </div>

        <div className="flex justify-between border-b pb-2">
          <span className="font-semibold text-gray-700">Dirección:</span>
          <span className="text-gray-900">📍 {localStorage.getItem("userAddress") || "No disponible"}</span>
        </div>

        <div className="flex justify-between border-b pb-2">
          <span className="font-semibold text-gray-700">Teléfono:</span>
          <span className="text-gray-900">📞 {localStorage.getItem("userPhone") || "No disponible"}</span>
        </div>

        <div className="flex justify-between border-b pb-2">
          <span className="font-semibold text-gray-700">Total de Pedidos:</span>
          <span className="text-gray-900">{orderCount !== null ? orderCount : "Cargando..."}</span>
        </div>
      </div>

      <div className="mt-6 flex justify-center">
        <button
          onClick={() => router.push("/dashboard")}
          className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition"
        >
          Ver mis pedidos
        </button>
      </div>
    </div>
  );
}
