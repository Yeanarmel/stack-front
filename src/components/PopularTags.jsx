const PopularTags = () => {
  const tags = ["React", "TypeScript", "JavaScript", "Node.js", "CSS"];

  return (
    <div className="bg-white p-4 rounded-xl border mt-6">
      <h3 className="font-semibold mb-3">Popular Tags</h3>
      <div className="flex gap-2 flex-wrap">
        {tags.map((tag, i) => (
          <span key={i} className="bg-gray-100 px-3 py-1 rounded-full text-sm">
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};

export default PopularTags;
