import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "./ProductCard";


interface IProduct {
  name: string;
  price: number;
  description: string;
  image: string;
  categoryId: number;
  stock: number;
}

export default function ProductGrid({ filter }: { filter: string }) {
  const [products, setProducts] = useState<IProduct[]>([]);

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    axios
      .get(`${apiUrl}/products`)
      .then((response) => setProducts(response.data))
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  // Filtrando productos
  const filteredProducts = products.filter((product) => 
    product.name.toLowerCase().includes(filter) // Compara el filtro con el nombre del producto
  );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
      {filteredProducts.map((product: IProduct) => (
        <ProductCard key={product.name} product={product} />
      ))}
    </div>
  );
}
