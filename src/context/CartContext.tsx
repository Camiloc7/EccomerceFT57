"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { useAuth } from "./AuthContext"; // Importamos el AuthContext para usar el usuario logeado

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface CartContextProps {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  clearCart: () => void;
  total: number;
  checkout: () => Promise<void>; // Nueva función para realizar el pedido
}

const CartContext = createContext<CartContextProps | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const { user, token } = useAuth(); // Obtenemos el usuario logeado y el token desde el AuthContext

  const addToCart = (item: CartItem) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem.id === item.id);

      if (existingItem) {
        // Si el producto ya está en el carrito, incrementa la cantidad
        return prevCart.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + item.quantity }
            : cartItem
        );
      } else {
        // Si no, agrega el producto al carrito
        return [...prevCart, item];
      }
    });
  };

  const clearCart = () => setCart([]);

  const total = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const checkout = async () => {
    if (!user || !token) {
      throw new Error("Debes estar logeado para realizar un pedido.");
    }

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;

      const response = await fetch(`${apiUrl}/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          userId: user.email, // Usamos el email del usuario logeado
          products: cart,
        }),
      });

      if (!response.ok) {
        throw new Error("Error al realizar el pedido.");
      }

      const data = await response.json();
      alert(data.message);
      clearCart();
    } catch (error) {
      console.error("Error durante el checkout:", error);
      alert("Hubo un problema al realizar tu pedido.");
    }
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, clearCart, total, checkout }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart debe usarse dentro de un CartProvider");
  }
  return context;
};
