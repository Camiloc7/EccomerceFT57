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
  const [searchQuery, setSearchQuery] = useState<string>(""); 
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        const productResponse = await axios.get(`${apiUrl}/products`);
        setProducts(productResponse.data);

        const uniqueCategories = Array.from(
          new Map(
            productResponse.data.map((product: IProduct) => [
              product.categoryId,
              getCategoryName(product.categoryId),
            ])
          ) as Map<number, string> 
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

  const getCategoryName = (id: number) => {
    const categoryNames: { [key: number]: string } = {
      1: "Smartphones",
      2: "Laptops",
      3: "Tablets",
      4: "Relojes",
      5: "Audio",
      6: "Computadoras",
    };
    return categoryNames[id] || "Otros";
  };

  if (loading) {
    return <div className="text-center py-8">Cargando productos...</div>;
  }

  const filteredProducts = products.filter(
    (product) =>
      (!selectedCategory || product.categoryId === selectedCategory) &&
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) 
  );

  return (
    <div className="flex flex-col md:flex-row container mx-auto px-4 mt-8">
      <aside className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white w-full md:w-64 p-4 md:h-screen sticky top-0 rounded-md shadow">
        <h2 className="text-lg font-bold mb-4">Categorías</h2>
        <div className="flex flex-row space-x-4 overflow-x-auto md:space-x-0 md:block">
          <button
            className={`block w-auto text-left p-2 rounded-md ${
              selectedCategory === null ? "bg-blue-500 text-white" : "hover:bg-gray-200"
            }`}
            onClick={() => setSelectedCategory(null)}
          >
            Todas las categorías
          </button>

          {categories.map((category) => (
            <button
              key={category.id}
              className={`block w-auto text-left p-2 rounded-md ${
                selectedCategory === category.id
                  ? "bg-blue-500 text-white"
                  : "hover:bg-gray-200"
              }`}
              onClick={() => setSelectedCategory(category.id)}
            >
              {category.name}
            </button>
          ))}
        </div>
      </aside>
      <main className="flex-1 p-6">
        <div className="mb-6">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar productos..."
            className="w-full p-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
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
