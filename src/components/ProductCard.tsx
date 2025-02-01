import React from "react";
import Link from "next/link";

interface IProduct {
  name: string;
  price: number;
  description: string;
  image: string;
  categoryId: number;
  stock: number;
}

export default function ProductCard({ product }: { product: IProduct }) {
  return (
    <div className="border rounded-lg shadow-md p-4 hover:shadow-lg transition">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-48 object-contain rounded-md mb-4"
      />
      <h2 className="text-lg font-bold mb-2">{product.name}</h2>
      <p className="text-indigo-600 font-semibold mb-4">${product.price.toLocaleString()}</p>
      <Link href={`/products/${product.categoryId}`}>
        <button className="bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600">
          Ver más
        </button>
      </Link>
    </div>
  );
}







