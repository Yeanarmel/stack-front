import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DashboardLayout from "../layouts/DashboardLayout";
import API from "../api/api";

const TagsPage = () => {
  const [tags, setTags] = useState([]);

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const res = await API.get("/tags/popular");
        setTags(res.data);
      } catch (err) {
        console.error("Failed to load tags", err);
      }
    };

    fetchTags();
  }, []);

  return (
    <DashboardLayout>
      <h1 className="text-xl sm:text-2xl font-bold mb-6">Tags</h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {tags.map((tag) => (
          <Link
            key={tag.name}
            to={`/tags/${tag.name}`}
            className="bg-white border rounded-xl p-4 hover:shadow transition"
          >
            <h3 className="font-semibold text-blue-700">#{tag.name}</h3>
            <p className="text-sm text-gray-500">{tag.count} questions</p>
          </Link>
        ))}
      </div>
    </DashboardLayout>
  );
};

export default TagsPage;
