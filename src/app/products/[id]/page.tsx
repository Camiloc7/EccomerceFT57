"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "@/context/AuthContext";  // Importar el contexto de autenticación

interface IProduct {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
  categoryId: number;
  stock: number;
}

export default function ProductDetail() {
  const { isLoggedIn, user } = useAuth();  // Obtener el estado de autenticación
  const [product, setProduct] = useState<IProduct | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [productId, setProductId] = useState<number | null>(null);

  useEffect(() => {
    const urlParts = window.location.pathname.split('/'); 
    const id = urlParts[urlParts.length - 1]; 

    if (id) {
      setProductId(Number(id)); 
    }
  }, []);

  useEffect(() => {
    if (productId) {
      const fetchProduct = async () => {
        try {
          const apiUrl = process.env.NEXT_PUBLIC_API_URL; 
          const response = await axios.get(`${apiUrl}/products`); 
          
          const product = response.data.find((prod: IProduct) => prod.id === productId);
          
          if (product) {
            setProduct(product); 
          } else {
            alert("Producto no encontrado");
          }
        } catch (error) {
          console.error("Error fetching product:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchProduct();
    }
  }, [productId]);

  const addToCart = () => {
    if (!isLoggedIn) {
      alert("Debes iniciar sesión para añadir productos al carrito.");
      // Redirigir a la página de login si el usuario no está autenticado
      window.location.href = "/login";
      return;
    }

    // Si el usuario está logueado, proceder con añadir al carrito
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Producto añadido al carrito");
  };

  if (loading) {
    return <div className="text-center py-8">Cargando producto...</div>;
  }

  if (!product) {
    return <div className="text-center py-8">Producto no encontrado</div>;
  }

  return (
    <div className="container mx-auto px-4 mt-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-80 object-contain rounded-md mb-4"
        />
        <div>
          <h2 className="text-2xl font-bold">{product.name}</h2>
          <p className="text-indigo-600 font-semibold mb-4">${product.price}</p>
          <p className="text-gray-700 mb-4">{product.description}</p>
          <button
            onClick={addToCart}
            className="bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600"
          >
            Añadir al carrito
          </button>
        </div>
      </div>
    </div>
  );
}
