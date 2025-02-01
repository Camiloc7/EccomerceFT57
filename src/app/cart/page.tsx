"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "@/context/AuthContext";  
import { CartItem } from "@/types";  // Importamos la interfaz desde types

export default function Cart() {
  const { isLoggedIn, token } = useAuth();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const savedCart: CartItem[] = JSON.parse(localStorage.getItem("cart") || "[]");
    setCartItems(savedCart);
  }, []);

  const checkout = async () => {
    if (!isLoggedIn) {
      alert("Debes iniciar sesión para proceder con la compra.");
      return;
    }
  
    // Filtramos productos duplicados
    const uniqueProducts: CartItem[] = Array.from(new Set(cartItems.map((item) => item.id)))
      .map((id) => cartItems.find((item) => item.id === id) as CartItem);
  
    const orderData = {
      products: uniqueProducts.map((item) => item.id),
    };
  
    console.log("Order Data:", orderData);
  
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/orders`,
        orderData,
        {
          headers: {
            Authorization: token,
          },
        }
      );
  
      console.log("Respuesta de la API:", response);
      alert("Orden enviada con éxito.");
      localStorage.removeItem("cart");
      setCartItems([]);
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        console.error("Error al realizar la compra, respuesta de la API:", error.response);
        alert(`Error al realizar la compra: ${error.response.data.message || "Intenta nuevamente."}`);
      } else {
        console.error("Error inesperado:", error);
        alert("Hubo un problema inesperado al realizar la compra.");
      }
    }
  };

  return (
    <div className="container mx-auto px-4 mt-8">
      <h2 className="text-3xl font-bold mb-4">Carrito de Compras</h2>
      {cartItems.length === 0 ? (
        <p>No hay productos en el carrito.</p>
      ) : (
        <div>
          <ul>
            {cartItems.map((item, index) => (
              <li key={index} className="flex justify-between items-center py-2">
                <span>{item.name}</span>
                <span>${item.price}</span>
              </li>
            ))}
          </ul>
          <button
            onClick={checkout}
            className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 mt-4"
          >
            Realizar Compra
          </button>
        </div>
      )}
    </div>
  );
}
