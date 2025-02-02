import React from "react";
import Link from "next/link";
import Image from "next/image";  
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
      <Image
        src={product.image}
        alt={product.name}
        width={500}    
        height={500}   
        quality={100}   
        className="w-full h-48 object-contain rounded-md mb-4"
        sizes="(max-width: 768px) 100vw, 50vw"  
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



