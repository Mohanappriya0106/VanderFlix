import { useEffect, useState } from "react";
import { fetchExperiences } from "../services/api";
import ExperienceCard from "./ExperienceCard";

function ExperienceGrid() {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchExperiences()
      .then(res => setExperiences(res.data.data))
      .catch(() => setError("Failed to load experiences"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading experiences...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {experiences.map(exp => (
        <ExperienceCard key={exp._id} experience={exp} />
      ))}
    </div>
  );
}

export default ExperienceGrid;
