import { MessageSquare } from "lucide-react";
import { Link } from "react-router-dom";

const QuestionCard = ({ question }) => {
  // 🛑 Defensive guard (THIS FIXES YOUR ERROR)
  if (!question) return null;

  return (
    <div className="border rounded-xl p-4 sm:p-5 bg-white hover:shadow-md transition">
      <div className="flex gap-4 sm:gap-6">
        {/* Stats (desktop only) */}
        <div className="hidden sm:flex flex-col items-center text-sm text-gray-600 min-w-[70px]">
          <span className="font-bold text-gray-800">
            {question.votes}
          </span>
          <span>votes</span>

          <span
            className={`mt-2 font-bold ${
              question.answers > 0
                ? "text-green-600"
                : "text-gray-600"
            }`}
          >
            {question.answers}
          </span>
          <span>answers</span>
        </div>

        {/* Content */}
        <div className="flex-1">
          {/* Title */}
          <Link to={`/questions/${question.id}`}>
            <h2 className="text-base sm:text-lg font-semibold text-gray-800 hover:text-blue-600">
              {question.title}
            </h2>
          </Link>

          {/* Mobile stats */}
          <div className="flex sm:hidden items-center gap-4 mt-2 text-xs text-gray-500">
            <span>{question.votes} votes</span>
            <span className="flex items-center gap-1">
              <MessageSquare size={14} />
              {question.answers}
            </span>
          </div>

          {/* Author */}
          <div className="flex items-center text-sm text-gray-500 mt-3 gap-3">
            <img
              src={question.avatar}
              alt={question.author}
              className="w-7 h-7 rounded-full"
            />
            <span className="font-medium text-gray-700">
              {question.author}
            </span>
            <span className="text-gray-400">• {question.time}</span>
          </div>

          {/* Tags */}
          <div className="mt-3 flex gap-2 flex-wrap">
            {question.tags?.map((tag) => (
              <span
                key={tag}
                className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-medium hover:bg-blue-100 cursor-pointer"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;
