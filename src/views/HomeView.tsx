"use client";
import React, { useState } from "react";
import HeroBanner from "@/components/HeroBanner";
import ProductGrid from "@/components/ProductGrid";
import SearchBar from "@/components/SearchBar";
export default function HomeViews() {
  const [filter, setFilter] = useState("");
  const handleSearch = (query: string) => {
    setFilter(query.toLowerCase()); 
  };
  return (
    <div>
      <HeroBanner />
      <div className="container mx-auto px-4">
        <SearchBar onSearch={handleSearch} />
        <ProductGrid filter={filter} />
      </div>
    </div>
  );
}
