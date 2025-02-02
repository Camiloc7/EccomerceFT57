"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image"; 
import { useAuth } from "@/context/AuthContext"; 
interface IOrder {
  id: number;
  status: string;
  date: string;
  products: { name: string; price: number; image: string }[]; 
}
export default function Dashboard() {
  const { token, isLoggedIn } = useAuth(); 
  const [orders, setOrders] = useState<IOrder[]>([]); 
  const [loading, setLoading] = useState<boolean>(true); 
  const [error, setError] = useState<string | null>(null); 
  useEffect(() => {
    if (!isLoggedIn) {
      alert("Debes iniciar sesión para ver tus pedidos.");
      window.location.href = "/login";  
      return;
    }
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/users/orders`, {
          headers: {
            Authorization: token,
          },
        });
        if (Array.isArray(response.data)) {
          if (response.data.length === 0) {
            setError("No tienes pedidos aún.");
          } else {
            setOrders(response.data); 
          }
        } else {
          setError("No se han encontrado pedidos.");
        }
      } catch (error) {
        console.error("Error al obtener los pedidos:", error);
        setError("Error al obtener los pedidos.");
      } finally {
        setLoading(false); 
      }
    };

    fetchOrders();
  }, [isLoggedIn, token]);
  if (loading) {
    return <div className="text-center py-8 text-lg font-semibold">Cargando tus pedidos...</div>;
  }
  if (error) {
    return <div className="text-center py-8 text-red-500 text-lg font-semibold">{error}</div>;
  }
  if (orders.length === 0) {
    return <div className="text-center py-8 text-lg font-semibold">No tienes pedidos aún.</div>;
  }
  const calculateTotal = (products: { price: number }[]) => {
    return products.reduce((acc, product) => acc + product.price, 0);
  };
  return (
    <div className="container mx-auto px-4 mt-8">
      <h2 className="text-3xl font-bold mb-8 text-center text-blue-600">Mis Pedidos</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {orders.map((order) => (
          <div
            key={order.id}
            className="bg-white shadow-lg rounded-lg p-6 border border-gray-200 hover:shadow-xl transition-shadow"
          >
            <div className="flex justify-between items-center mb-4">
              <p className="text-gray-600 text-sm">{new Date(order.date).toLocaleDateString()}</p>
              <span
                className={`px-3 py-1 rounded-full text-sm font-semibold ${
                  order.status === "approved"
                    ? "bg-green-200 text-green-700"
                    : "bg-yellow-200 text-yellow-700"
                }`}
              >
                {order.status === "approved" ? "En proceso de envío" : "Pendiente"}
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
                    <p className="text-lg font-semibold text-gray-800">{product.name}</p>
                    <p className="text-gray-600">${product.price}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 border-t pt-4">
              <div className="flex justify-between">
                <span className="text-lg font-semibold text-gray-800">Total:</span>
                <span className="text-lg font-semibold text-gray-900">
                  ${calculateTotal(order.products).toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
