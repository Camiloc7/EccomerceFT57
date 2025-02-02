"use client";

import React, { useEffect } from "react";
import axios from "axios";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext"; // Importamos el contexto del carrito

export default function Cart() {
  const { isLoggedIn, token } = useAuth();
  const { cart, clearCart, total } = useCart(); // Obtenemos el carrito desde el contexto
  const router = useRouter();

  // Redirigir si el carrito está vacío
  useEffect(() => {
    if (cart.length === 0 && window.location.pathname !== "/products") {
      setTimeout(() => {
        router.push("/products"); // Redirige después de 2 segundos si el carrito está vacío
      }, 2000);
    }
  }, [cart, router]);

  const checkout = async () => {
    if (!isLoggedIn) {
      alert("Debes iniciar sesión para proceder con la compra.");
      router.push("/login"); // Redirige al login
      return;
    }

    // Filtramos productos duplicados en el carrito
    const uniqueProducts = Array.from(new Set(cart.map((item) => item.id)))
      .map((id) => cart.find((item) => item.id === id));

      const orderData = {
        products: uniqueProducts
          .map((item) => item && item.id)  // Aseguramos que item no sea undefined
          .filter((id) => id !== undefined), // Filtramos cualquier id que sea undefined
      };
      

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/orders`,
        orderData,
        {
          headers: {
            Authorization: token, // El token debe ser un Bearer Token válido
          },
        }
      );

      alert("Orden enviada con éxito.");
      clearCart(); // Limpiar el carrito después de la compra
    } catch (error: any) {
      if (error.response) {
        console.error("Error al realizar la compra, respuesta de la API:", error.response);
        alert(`Error al realizar la compra: ${error.response.data.message || "Intenta nuevamente."}`);
      } else {
        console.error("Error inesperado:", error.message);
        alert("Hubo un problema inesperado al realizar la compra.");
      }
    }
  };

  return (
    <div className="container mx-auto px-4 mt-8">
      <h2 className="text-3xl font-bold mb-4 text-center text-gray-800">Carrito de Compras</h2>
      
      {cart.length === 0 ? (
        <div className="text-center">
          <p className="text-lg text-gray-500 mb-4">No hay productos en el carrito.</p>
          <p className="text-sm text-gray-400">Serás redirigido a la página de productos...</p>
        </div>
      ) : (
        <div>
          <ul className="space-y-4">
            {cart.map((item, index) => (
              item ? ( // Aseguramos que 'item' no sea undefined
                <li
                  key={index}
                  className="flex justify-between items-center bg-white shadow-md rounded-md p-4 mb-4"
                >
                  <div className="flex items-center space-x-4">
                    <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-md" />
                    <span className="font-semibold text-gray-800">{item.name}</span>
                  </div>
                  <span className="text-gray-600">${item.price}</span>
                </li>
              ) : null // Si 'item' es undefined, no renderiza nada
            ))}
          </ul>
          
          {/* Total */}
          <div className="text-right text-xl font-semibold mt-4">
            Total: ${total}
          </div>

          {/* Botón de compra */}
          <div className="text-center">
            <button
              onClick={checkout}
              className="bg-green-600 text-white py-3 px-6 rounded-md hover:bg-green-700 transition-all duration-300 mt-6"
            >
              Realizar Compra
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
