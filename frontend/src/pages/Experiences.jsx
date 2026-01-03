import { useEffect, useState } from "react";
import axios from "axios";

export default function Experiences() {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchExperiences() {
      try {
        const res = await axios.get("http://localhost:5000/api/v1/experiences");

        setExperiences(res.data.data.items || []);
      } catch (err) {
        setError("Failed to load experiences");
      } finally {
        setLoading(false);
        setLoading(false);
      }
    }
    fetchExperiences();
  }, []);

  if (loading) return <p className="text-center py-10">Loading...</p>;
  if (error) return <p className="text-center py-10 text-red-500">{error}</p>;

  return (
    <main className="max-w-6xl mx-auto px-6 py-10">
      <h1 className="text-2xl font-semibold mb-6">Travel Experiences</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {experiences.map((exp) => (
          <div
            key={exp._id}
            className="bg-white rounded-2xl shadow-sm p-4 border"
          >
            <img
              src={exp.heroImage}
              alt={exp.title}
              className="w-full h-40 object-cover rounded-xl mb-3"
            />
            <h2 className="text-lg font-medium">{exp.title}</h2>
            <p className="text-sm text-gray-600">{exp.location}</p>
            <p className="text-xs text-gray-500 mt-1">{exp.category}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
