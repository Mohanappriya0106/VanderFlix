export default function ExperienceCard({ exp }) {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 hover:shadow-2xl transition-all">
      <img
        src={exp.heroImage}
        alt={exp.title}
        className="w-full aspect-[16/9] object-cover"
        loading="lazy"
        onError={(e)=>{e.target.src='https://placehold.co/600x400'}}
      />
      <div className="p-5 space-y-2">
        <h3 className="text-xl font-bold text-gray-800">{exp.title}</h3>
        <p className="text-sm font-medium text-gray-600">{exp.location}</p>
        <div className="flex flex-wrap gap-2 text-xs">
          <span className="px-2 py-1 bg-gray-100 rounded">{exp.category}</span>
          <span className="px-2 py-1 bg-gray-100 rounded">{exp.budgetRange}</span>
          <span className="px-2 py-1 bg-gray-100 rounded">{exp.duration}</span>
        </div>
        <button className="w-full bg-black text-white py-2 rounded-lg text-sm font-semibold hover:bg-gray-900 transition">
          View Spotlight
        </button>
      </div>
    </div>
  );
}
