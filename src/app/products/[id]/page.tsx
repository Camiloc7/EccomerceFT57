"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import AlertModal from "@/components/Modals/AlertModal";

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
  const { addToCart } = useCart();
  const [product, setProduct] = useState<IProduct | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [productId, setProductId] = useState<number | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  useEffect(() => {
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
      const response = await axios.get(`${apiUrl}/products`);
      const foundProduct = response.data.find((prod: IProduct) => prod.id === id);
      if (foundProduct) {
        setProduct(foundProduct);
      } else {
        setModalMessage("Producto no encontrado");
        setShowModal(true);
      }
    } catch (error) {
      console.error("Error al obtener el producto:", error);
      setModalMessage("Error al obtener el producto. Inténtalo de nuevo.");
      setShowModal(true);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async () => {
    if (!isLoggedIn) {
      setModalMessage("Debes iniciar sesión para añadir productos al carrito.");
      setShowModal(true);
      return;
    }

    if (product) {
      try {
        const addedSuccessfully = await addToCart({
          ...product,
          quantity: 1,
        });

        if (!addedSuccessfully) {
          setModalMessage("Este producto ya está en el carrito. Un usuario no puede comprar más de un artículo igual en el mismo pedido para evitar distribución al por mayor.");
          setShowModal(true);
          return;
        }

        setModalMessage("Producto añadido al carrito");
        setShowModal(true);
        setTimeout(() => {
          router.push("/cart");
        }, 1500);
      } catch (error) {
        console.error("Error al añadir al carrito:", error);
        setModalMessage("Hubo un problema al añadir el producto al carrito. Intenta de nuevo.");
        setShowModal(true);
      }
    }
  };

  const closeModal = () => {
    setShowModal(false);
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

          <div className="flex space-x-4">
            <button
              onClick={handleAddToCart}
              className="bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 transition"
            >
              Añadir al carrito
            </button>
            <button
              onClick={() => router.push("/products")}
              className="bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 transition"
            >
              Ver más productos
            </button>
          </div>
        </div>
      </div>

      <AlertModal
        isOpen={showModal}
        message={modalMessage}
        onClose={closeModal}
      />
    </div>
  );
}
