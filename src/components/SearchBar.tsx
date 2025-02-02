import React, { useState } from "react";
export default function SearchBar({ onSearch }: { onSearch: (query: string) => void }) {
  const [query, setQuery] = useState("");
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    onSearch(e.target.value);
  };
  return (
    <div className="mt-8 mb-4">
      <input
        type="text"
        value={query}
        onChange={handleSearch}
        placeholder="Buscar productos..."
        className="w-full border rounded-md py-2 px-4 focus:ring-2 focus:ring-indigo-500"
      />
    </div>
  );
}
