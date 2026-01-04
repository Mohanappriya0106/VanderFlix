import { useState, useEffect } from "react";
import request from "axios";
import ExperienceCard from "./ExperienceCard.jsx";

export default function ExperienceGrid() {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchExperiences() {
      try {
        const res = await request.get("http://localhost:5000/api/v1/experiences");
        setExperiences(res.data.data.items || []);
      } catch (err) {
        setError("Failed to load experiences");
      } finally {
        setLoading(false);
      }
    }
    fetchExperiences();
  }, []);

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (error) return <p className="text-center text-red-500 mt-10">{error}</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6">
      {experiences.map((exp) => (
        <ExperienceCard key={exp._id} exp={exp} />
      ))}
    </div>
  );
}

