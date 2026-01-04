import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Experiences from "./pages/Experiences";
import Login from "./pages/Login";
import Favorites from "./pages/Favorites";
import SearchResults from "./pages/SearchResults";

export default function App() {
  return (
    <>
      <Navbar />  {/* Navbar must be here, OUTSIDE Routes */}

      <Routes>
        <Route path="/" element={<Experiences />} />
        <Route path="/login" element={<Login />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/search" element={<SearchResults />} />
      </Routes>
    </>
  );
}

