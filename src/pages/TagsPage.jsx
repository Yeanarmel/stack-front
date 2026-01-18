import { Link } from "react-router-dom";
import DashboardLayout from "../layouts/DashboardLayout";

const TagsPage = () => {
  const tags = [
    { name: "react", count: 120 },
    { name: "javascript", count: 98 },
    { name: "typescript", count: 64 },
    { name: "nodejs", count: 52 },
    { name: "css", count: 41 },
    { name: "websockets", count: 28 },
  ];

  return (
    <DashboardLayout>
      <h1 className="text-xl sm:text-2xl font-bold mb-6">Tags</h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {tags.map((tag) => (
          <Link key={tag.name} to={`/tags/${tag.name}`} className="bg-white border rounded-xl p-4 hover:shadow transition">
            <h3 className="font-semibold text-blue-700">#{tag.name}</h3>
            <p className="text-sm text-gray-500">
              {tag.count} questions
            </p>
          </Link>
        ))}
      </div>
    </DashboardLayout>
  );
};

export default TagsPage;
