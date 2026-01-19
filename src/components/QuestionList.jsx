import { useEffect, useState } from "react";
import API from "../api/api";
import QuestionCard from "./QuestionCard";

const QuestionList = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await API.get("/questions");
        setQuestions(res.data);
      } catch (err) {
        setError("Failed to load questions");
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  if (loading) {
    return <p className="text-center text-gray-500">Loading questions...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  if (!questions.length) {
    return (
      <p className="text-center text-gray-500">
        No questions yet. Be the first to ask!
      </p>
    );
  }

  return (
    <div className="space-y-5">
      {questions.map((question) => (
        <QuestionCard key={question.id} question={question} />
      ))}
    </div>
  );
};

export default QuestionList;
