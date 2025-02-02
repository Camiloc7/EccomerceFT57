"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

// Definir la estructura de un producto en el carrito
interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

// Definir la estructura del contexto
interface CartContextProps {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  clearCart: () => void;
  total: number;
}

// Crear el contexto con el tipo adecuado
const CartContext = createContext<CartContextProps | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  // Cargar carrito desde localStorage
  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  // Guardar carrito en localStorage cuando cambia
  useEffect(() => {
    if (typeof window !== "undefined") {
      const stringifiedCart = JSON.stringify(cart); // Extraemos la conversión JSON fuera del useEffect
      localStorage.setItem("cart", stringifiedCart);
    }
  }, [cart]); // Ahora solo `cart` es la dependencia

  const addToCart = (item: CartItem) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem.id === item.id);

      if (existingItem) {
        return prevCart.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + item.quantity }
            : cartItem
        );
      } else {
        return [...prevCart, { ...item, quantity: item.quantity }];
      }
    });
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("cart");
  };

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, clearCart, total }}>
      {children}
    </CartContext.Provider>
  );
};

// Hook personalizado para usar el contexto
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart debe usarse dentro de un CartProvider");
  }
  return context;
};
