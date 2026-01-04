import ExperienceGrid from "../components/ExperienceGrid.jsx";

export default function Experiences() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="text-center py-8">
        <h1 className="text-4xl font-extrabold text-gray-900">Travel Experience Spotlight</h1>
        <p className="text-sm text-gray-500 mt-2">Discover immersive journeys, curated gear, and visual destination stories.</p>
      </header>

      <ExperienceGrid />
    </div>
  );
}


