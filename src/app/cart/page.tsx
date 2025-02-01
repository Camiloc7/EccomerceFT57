"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "@/context/AuthContext";  

export default function Cart() {
  const { isLoggedIn, token } = useAuth();
  const [cartItems, setCartItems] = useState<any[]>([]);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCartItems(savedCart);
  }, []);



  const checkout = async () => {
    if (!isLoggedIn) {
      alert("Debes iniciar sesión para proceder con la compra.");
      return;
    }
  
    // Filtramos productos duplicados en el carrito
    const uniqueProducts = Array.from(new Set(cartItems.map((item: any) => item.id)))
      .map((id) => cartItems.find((item: any) => item.id === id));
  
    const orderData = {
      products: uniqueProducts.map((item: any) => item.id),  // Enviamos solo los IDs de los productos
    };
  
    // Verificamos que los datos que vamos a enviar sean correctos
    console.log("Order Data:", orderData);
  
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/orders`,
        orderData,
        {
          headers: {
            Authorization: token,  // El token debe ser un Bearer Token válido
          },
        }
      );
  
      // Mostramos la respuesta de la API
      console.log("Respuesta de la API:", response);
  
      alert("Orden enviada con éxito.");
      localStorage.removeItem("cart");  // Limpiar el carrito después de la compra
      setCartItems([]);  // Limpiar los productos del carrito en el estado
    } catch (error: any) {
      if (error.response) {
        // Error de la respuesta de la API
        console.error("Error al realizar la compra, respuesta de la API:", error.response);
        alert(`Error al realizar la compra: ${error.response.data.message || "Intenta nuevamente."}`);
      } else if (error.request) {
        // Error de la solicitud (sin respuesta de la API)
        console.error("Error de la solicitud:", error.request);
        alert("Hubo un problema con la solicitud, intentalo nuevamente.");
      } else {
        // Error inesperado
        console.error("Error inesperado:", error.message);
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
            {cartItems.map((item: any, index) => (
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
