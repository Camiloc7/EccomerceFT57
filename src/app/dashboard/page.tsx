"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

interface IOrder {
  id: number;
  status: string;
  date: string;
  products: { name: string; price: number; image: string }[];
}

export default function Dashboard() {
  const { token, isLoggedIn } = useAuth();
  const router = useRouter();
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (isLoggedIn) {
      const fetchOrders = async () => {
        try {
          const response = await axios.get(
            `${process.env.NEXT_PUBLIC_API_URL}/users/orders`,
            {
              headers: { Authorization: token },
            }
          );

          if (Array.isArray(response.data)) {
            if (response.data.length === 0) {
              // Error cuando no hay pedidos
            } else {
              setOrders(response.data);
            }
          } else {
            // Error cuando no se encuentran pedidos
          }
        } catch (error) {
          console.error("Error al obtener los pedidos:", error);
          // Puedes manejar el error aquí si lo deseas
        } finally {
          setLoading(false);
        }
      };

      fetchOrders();
    } else {
      setLoading(false); 
    }
  }, [isLoggedIn, token]);

  if (!isLoggedIn) {
    return (
      <div className="text-center py-8 text-red-500 text-lg font-semibold">
        Debes iniciar sesión para ver tus pedidos.
        <button
          onClick={() => router.push("/login")}
          className="mt-4 bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 transition"
        >
          Iniciar sesión
        </button>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="text-center py-8 text-lg font-semibold">
        Cargando tus pedidos...
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="text-center py-8 text-red-500 text-lg font-semibold">
        No tienes pedidos aún.
        <p className="mt-4 text-gray-600 text-lg">
          ¡No te preocupes! <br></br> Puedes empezar a realizar compras seleccionando<br></br> productos
          de nuestro catálogo, <br></br>añadiéndolos al carrito y completando el proceso de compra.
        </p>
        <button
          onClick={() => router.push("/products")}
          className="mt-4 bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 transition"
        >
          Ver productos
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 mt-8">
      <h2 className="text-3xl font-bold mb-8 text-center text-blue-600">
        Mis Pedidos
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {orders.map((order) => (
          <div
            key={order.id}
            className="bg-white shadow-lg rounded-lg p-6 border border-gray-200 hover:shadow-xl transition-shadow"
          >
            <div className="flex justify-between items-center mb-4">
              <p className="text-gray-600 text-sm">
                {new Date(order.date).toLocaleDateString()}
              </p>
              <span
                className={`px-3 py-1 rounded-full text-sm font-semibold ${
                  order.status === "approved"
                    ? "bg-green-200 text-green-700"
                    : "bg-yellow-200 text-yellow-700"
                }`}
              >
                {order.status === "approved"
                  ? "En proceso de envío"
                  : "Pendiente"}
              </span>
            </div>
            <div className="flex flex-col space-y-4">
              {order.products.map((product, index) => (
                <div key={index} className="flex items-center justify-between">
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={50}
                    height={50}
                    quality={100}
                    className="object-contain rounded-md"
                  />
                  <div className="ml-4 flex-1">
                    <p className="text-lg font-semibold text-gray-800">
                      {product.name}
                    </p>
                    <p className="text-gray-600">${product.price}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 border-t pt-4">
              <div className="flex justify-between">
                <span className="text-lg font-semibold text-gray-800">
                  Total:
                </span>
                <span className="text-lg font-semibold text-gray-900">
                  ${order.products.reduce((acc, product) => acc + product.price, 0).toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-8 text-center">
        <button
          onClick={() => router.push("/products")}
          className="bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 transition"
        >
          Ver más productos
        </button>
      </div>
    </div>
  );
}
