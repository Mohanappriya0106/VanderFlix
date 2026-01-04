import { useState, useEffect } from "react";

export default function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(query);
    }, 400);
    return () => clearTimeout(timer);
  }, [query]);

  return (
    <div className="flex-1 mx-6 relative z-10">
  <input
    type="text"
    placeholder="Search experiences..."
    value={query}
    onChange={(e) => setQuery(e.target.value)}
    className="w-full border border-gray-300 rounded-lg px-4 py-2 text-black bg-white focus:outline-none focus:ring-2"
  />
</div>

  );
}
