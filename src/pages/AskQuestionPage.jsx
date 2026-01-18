import { useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";

const AskQuestionPage = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const newQuestion = {
      title,
      description,
      tags: tags.split(",").map((t) => t.trim()),
    };

    console.log("Submitted question:", newQuestion);
  };

  return (
    <DashboardLayout>
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-xl shadow-sm">
        <h1 className="text-xl sm:text-2xl font-bold mb-6">
          Ask a Question
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full border rounded-lg px-4 py-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Description
            </label>
            <textarea
              rows="6"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className="w-full border rounded-lg px-4 py-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Tags (comma separated)
            </label>
            <input
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              className="w-full border rounded-lg px-4 py-2"
            />
          </div>

          <button
            type="submit"
            className="bg-blue-700 text-white px-6 py-2 rounded-lg hover:bg-blue-800"
          >
            Post Question
          </button>
        </form>
      </div>
    </DashboardLayout>

  );
};

export default AskQuestionPage;
