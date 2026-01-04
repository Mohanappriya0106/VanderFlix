import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Search } from "lucide-react";

export default function Navbar() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate(); // Must be inside component

  function handleSearch() {
    if (!query.trim()) return; // Prevent empty search
    navigate(`/search?q=${encodeURIComponent(query)}`);
  }

  return (
    <nav className="bg-white shadow-sm px-6 py-4 flex items-center justify-between">
      <div className="text-xl font-bold text-gray-800">
        VanderFlix
      </div>

      {/* Search Bar */}
      <div className="flex-1 mx-6 flex items-center gap-2">
        <input
          type="text"
          placeholder="Search experiences..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1 border border-gray-300 rounded-lg px-4 py-2 text-black bg-white focus:outline-none focus:ring-2"
        />

        <button
          onClick={handleSearch}
          className="flex items-center gap-1 border border-gray-700 px-3 py-2 rounded-lg hover:ring-2"
        >
          <Search size={18} />
          Search
        </button>
      </div>

      {/* Navigation Buttons */}
      <div className="flex space-x-4">
        <Link to="/login" className="text-gray-600 hover:text-gray-900">Login</Link>
        <Link to="/favorites" className="text-gray-600 hover:text-gray-900">Favorites</Link>
      </div>
    </nav>
  );
}
