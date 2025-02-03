"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import Image from "next/image";
import AlertModal from "@/components/Modals/AlertModal"; 

export default function Cart() {
  const { isLoggedIn, token } = useAuth();
  const { cart, clearCart, total, removeFromCart } = useCart();
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  useEffect(() => {
    if (cart.length === 0 && window.location.pathname !== "/products") {
      setTimeout(() => {
        router.push("/products");
      }, 2000);
    }
  }, [cart, router]);

  const showAlert = (message: string) => {
    setModalMessage(message);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const checkout = async () => {
    if (!isLoggedIn) {
      showAlert("Debes iniciar sesión para proceder con la compra.");
      router.push("/login"); 
      return;
    }
  
    const uniqueProducts = Array.from(new Set(cart.map((item) => item.id)))
      .map((id) => cart.find((item) => item.id === id));
  
    const orderData = {
      products: uniqueProducts
        .map((item) => item?.id)
        .filter((id): id is number => id !== undefined), 
    };
  
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/orders`,
        orderData,
        {
          headers: {
            Authorization: token, 
          },
        }
      );
  
      showAlert("Orden enviada con éxito.");
      clearCart(); 
  
      setTimeout(() => {
        router.push("/dashboard");
      }, 1500); 
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.error("Error al realizar la compra, respuesta de la API:", error.response);
        showAlert(`Error al realizar la compra: ${error.response?.data?.message || "Intenta nuevamente."}`);
      } else {
        console.error("Error inesperado:", error);
        showAlert("Hubo un problema inesperado al realizar la compra.");
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
              item && (
                <li
                  key={index}
                  className="flex justify-between items-center bg-white shadow-md rounded-md p-4 mb-4"
                >
                  <div className="flex items-center space-x-4">
                    <Image 
                      src={item.image} 
                      alt={item.name} 
                      width={64} 
                      height={64} 
                      className="object-cover rounded-md"
                    />
                    <span className="font-semibold text-gray-800">{item.name}</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className="text-gray-600">${item.price}</span>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="bg-white-500 text-white px-3 py-1 rounded-md hover:bg-red-200 transition"
                    >
                      ❌
                    </button>
                  </div>
                </li>
              )
            ))}
          </ul>

          <div className="text-right text-xl font-semibold mt-4">
            Total: ${total}
          </div>

          <div className="flex justify-center space-x-4 mt-6">
            <button
              onClick={checkout}
              className="bg-green-600 text-white py-3 px-6 rounded-md hover:bg-green-700 transition"
            >
              Realizar Compra
            </button>
            <button
              onClick={() => router.push("/products")}
              className="bg-gray-500 text-white py-3 px-6 rounded-md hover:bg-gray-600 transition"
            >
              Seguir Comprando
            </button>
          </div>
        </div>
      )}

<AlertModal
        isOpen={showModal}
        message={modalMessage}
        onClose={closeModal} 
      />
    </div>
  );
}