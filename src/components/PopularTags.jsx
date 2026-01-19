import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../api/api";

const PopularTags = () => {
  const [tags, setTags] = useState([]);

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const res = await API.get("/tags/popular");
        setTags(res.data);
      } catch (err) {
        console.error("Failed to load tags");
      }
    };

    fetchTags();
  }, []);

  return (
    <div className="bg-white p-4 rounded-xl border mt-6">
      <h3 className="font-semibold mb-3">Popular Tags</h3>

      <div className="flex gap-2 flex-wrap">
        {tags.map((tag) => (
          <Link
            key={tag.name}
            to={`/tags/${tag.name}`}
            className="bg-gray-100 px-3 py-1 rounded-full text-sm hover:bg-blue-100 cursor-pointer flex items-center gap-1"
          >
            <span>#{tag.name}</span>
            <span className="text-gray-500 text-xs">({tag.count})</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default PopularTags;
