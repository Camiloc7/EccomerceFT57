"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "@/components/ProductCard";

interface IProduct {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
  categoryId: number;
  stock: number;
}

interface ICategory {
  id: number;
  name: string;
}

export default function Products() {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>(""); // Nueva búsqueda por nombre
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;

        // Obtener productos
        const productResponse = await axios.get(`${apiUrl}/products`);
        setProducts(productResponse.data);

        // Extraer categorías únicas de los productos
        const uniqueCategories = Array.from(
          new Map(
            productResponse.data.map((product: IProduct) => [
              product.categoryId,
              getCategoryName(product.categoryId),
            ])
          )
        ).map(([id, name]) => ({ id, name }));
        setCategories(uniqueCategories);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Función para obtener el nombre de una categoría
  const getCategoryName = (id: number) => {
    const categoryNames: { [key: number]: string } = {
      1: "Smartphones",
      2: "Laptops",
      3: "Tablets",
      4: "Wearables",
      5: "Audio",
      6: "Accesorios",
    };
    return categoryNames[id] || "Otros";
  };

  if (loading) {
    return <div className="text-center py-8">Cargando productos...</div>;
  }

  // Filtrar productos por categoría y nombre
  const filteredProducts = products.filter(
    (product) =>
      (!selectedCategory || product.categoryId === selectedCategory) &&
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) // Búsqueda por nombre
  );

  return (
    <div className="flex container mx-auto px-4 mt-8">
      {/* Sidebar de Categorías */}
      <aside className="w-64 p-4 bg-gray-100 h-screen sticky top-0 rounded-md shadow">
        <h2 className="text-lg font-bold mb-4">Categorías</h2>
        <ul className="space-y-2">
          <li>
            <button
              className={`block w-full text-left p-2 rounded-md ${
                selectedCategory === null ? "bg-blue-500 text-white" : "hover:bg-gray-200"
              }`}
              onClick={() => setSelectedCategory(null)}
            >
              Todas las categorías
            </button>
          </li>
          {categories.map((category) => (
            <li key={category.id}>
              <button
                className={`block w-full text-left p-2 rounded-md ${
                  selectedCategory === category.id
                    ? "bg-blue-500 text-white"
                    : "hover:bg-gray-200"
                }`}
                onClick={() => setSelectedCategory(category.id)}
              >
                {category.name}
              </button>
            </li>
          ))}
        </ul>
      </aside>

      {/* Main Section */}
      <main className="flex-1 p-6">
        {/* Campo de búsqueda */}
        <div className="mb-6">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar productos..."
            className="w-full p-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Productos */}
        <h1 className="text-2xl font-bold mb-6">
          {selectedCategory
            ? `Productos: ${categories.find((c) => c.id === selectedCategory)?.name}`
            : "Todos los Productos"}
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <div className="col-span-full text-center text-gray-500">
              No se encontraron productos.
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
