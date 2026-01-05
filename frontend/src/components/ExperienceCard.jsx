function ExperienceCard({ experience }) {
  return (
    <div className="rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition">
      
      <img
        src={experience.heroImage}
        alt={experience.title}
        className="h-52 w-full object-cover"
      />

      <div className="p-4 space-y-2">
        <h3 className="text-lg font-semibold">
          {experience.title}
        </h3>

        <p className="text-sm text-gray-600">
          {experience.location} • {experience.duration}
        </p>

        <div className="flex justify-between text-xs text-gray-500">
          <span>{experience.category}</span>
          <span>{experience.budgetRange}</span>
        </div>

        <button className="mt-3 w-full bg-black text-white py-2 rounded-lg">
          View Experience
        </button>
      </div>
    </div>
  );
}

export default ExperienceCard;
