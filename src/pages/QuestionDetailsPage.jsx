import { useParams } from "react-router-dom";
import { ThumbsUp, MessageSquare } from "lucide-react";
import DashboardLayout from "../layouts/DashboardLayout";

const QuestionDetailsPage = () => {
  const { id } = useParams();

  // mock data (replace with API later)
  const question = {
    id,
    title: "How to efficiently manage state in a large React application?",
    description:
      "I am working on a large React app and managing state is becoming complex. What are best practices and tools to handle this?",
    votes: 45,
    author: "Alice Johnson",
    time: "2 hours ago",
    tags: ["react", "state-management", "typescript"],
    answers: [
      {
        id: 1,
        author: "Bob Smith",
        time: "1 hour ago",
        content:
          "You can use Redux Toolkit or Zustand. Also consider splitting state logically and using context wisely.",
      },
    ],
  };

  return (
    <DashboardLayout>
      {/* Question */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-800">
          {question.title}
        </h1>

        <div className="mt-2 text-sm text-gray-500">
          Asked by {question.author} • {question.time}
        </div>

        <p className="mt-4 text-gray-700">
          {question.description}
        </p>

        {/* Tags */}
        <div className="mt-4 flex gap-2 flex-wrap">
          {question.tags.map((tag) => (
            <span
              key={tag}
              className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Actions */}
        <div className="mt-6 flex items-center gap-4">
          <button className="flex items-center gap-2 text-gray-600 hover:text-blue-600">
            <ThumbsUp size={18} /> {question.votes}
          </button>
          <span className="flex items-center gap-2 text-gray-600">
            <MessageSquare size={18} /> {question.answers.length} answers
          </span>
        </div>
      </div>

      {/* Answers */}
      <div className="mt-8">
        <h2 className="text-lg font-semibold mb-4">Answers</h2>

        <div className="space-y-4">
          {question.answers.map((answer) => (
            <div
              key={answer.id}
              className="bg-white rounded-xl p-4 shadow-sm"
            >
              <p className="text-gray-700">{answer.content}</p>
              <div className="mt-2 text-sm text-gray-500">
                {answer.author} • {answer.time}
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default QuestionDetailsPage;