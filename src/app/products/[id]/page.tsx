"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext"; // Importar el contexto de carrito

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
  const { isLoggedIn } = useAuth();
  const router = useRouter();
  const { addToCart } = useCart(); // Obtener la función de añadir al carrito desde el contexto
  const [product, setProduct] = useState<IProduct | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [productId, setProductId] = useState<number | null>(null);

  useEffect(() => {
    // Obtener el ID del producto desde la URL
    const pathParts = window.location.pathname.split("/");
    const id = Number(pathParts[pathParts.length - 1]);

    if (!isNaN(id)) {
      setProductId(id);
    }
  }, []);

  useEffect(() => {
    if (productId) {
      fetchProduct(productId);
    }
  }, [productId]);

  const fetchProduct = async (id: number) => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      const response = await axios.get(`${apiUrl}/products`); // 🔹 Obtiene la lista de productos

      // 🔹 Buscar el producto correcto en la lista
      const foundProduct = response.data.find((prod: IProduct) => prod.id === id);

      if (foundProduct) {
        setProduct(foundProduct);
      } else {
        alert("Producto no encontrado");
      }
    } catch (error) {
      console.error("Error al obtener el producto:", error);
      alert("Error al obtener el producto. Inténtalo de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = () => {
    if (!isLoggedIn) {
      alert("Debes iniciar sesión para añadir productos al carrito.");
      router.push("/login");
      return;
    }

    if (product) {
      addToCart({
        ...product,
        quantity: 1, // Asumiendo que añadimos el producto con cantidad 1
      });
      alert("Producto añadido al carrito");
    }
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
        <Image
          src={product.image}
          alt={product.name}
          width={500}
          height={500}
          quality={100}
          className="w-full h-80 object-contain rounded-md mb-4"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        <div>
          <h2 className="text-2xl font-bold">{product.name}</h2>
          <p className="text-indigo-600 font-semibold mb-4">${product.price}</p>
          <p className="text-gray-700 mb-4">{product.description}</p>
          <button
            onClick={handleAddToCart} // Usamos la nueva función `handleAddToCart`
            className="bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600"
          >
            Añadir al carrito
          </button>
        </div>
      </div>
    </div>
  );
}
