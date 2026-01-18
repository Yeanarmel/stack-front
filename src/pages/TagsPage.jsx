// ===============================
// TagsPage.jsx
// ===============================

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { Link } from "react-router-dom";

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
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      <div className="flex flex-1">
        <Sidebar />

        <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-xl sm:text-2xl font-bold mb-6">Tags</h1>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {tags.map((tag) => (
              <Link
                key={tag.name}
                to={`/tags/${tag.name}`}
                className="bg-white border rounded-xl p-4 hover:shadow transition"
              >
                <h3 className="font-semibold text-blue-700">#{tag.name}</h3>
                <p className="text-sm text-gray-500">
                  {tag.count} questions
                </p>
              </Link>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default TagsPage;
