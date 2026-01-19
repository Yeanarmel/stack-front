import { useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import API from "../api/api";

const AskQuestionPage = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const newQuestion = {
        title,
        body: description,
        tags: tags.split(",").map((t) => t.trim()).filter(Boolean),
      };

      const res = await API.post("/questions", newQuestion);
      console.log("Question created:", res.data);

      setSuccess("Question posted successfully!");
      setTitle("");
      setDescription("");
      setTags("");
    } catch (err) {
      console.error("Failed to post question:", err);
      if (err.response) {
        setError(err.response.data.message || "Server error");
      } else {
        setError("Network error");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-xl shadow-sm">
        <h1 className="text-xl sm:text-2xl font-bold mb-6">
          Ask a Question
        </h1>

        {error && (
          <p className="text-red-500 mb-4">{error}</p>
        )}
        {success && (
          <p className="text-green-600 mb-4">{success}</p>
        )}

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
            disabled={loading}
            className={`w-full bg-blue-700 text-white px-6 py-2 rounded-lg hover:bg-blue-800 transition ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Posting..." : "Post Question"}
          </button>
        </form>
      </div>
    </DashboardLayout>
  );
};

export default AskQuestionPage;
