import QuestionCard from "./QuestionCard";

const QuestionList = () => {
  const questions = [
    {
      id: 1,
      title: "How to efficiently manage state in a large React application?",
      votes: 45,
      answers: 12,
      author: "Alice Johnson",
      time: "2 hours ago",
      tags: ["react", "state-management", "typescript"],
      avatar: "https://i.pravatar.cc/40?img=1",
    },
    {
      id: 2,
      title: "Understanding WebSockets for real-time applications",
      votes: 30,
      answers: 8,
      author: "Bob Smith",
      time: "5 hours ago",
      tags: ["websockets", "networking"],
      avatar: "https://i.pravatar.cc/40?img=2",
    },
  ];

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
        <QuestionCard
          key={question.id}
          question={question}
        />
      ))}
    </div>
  );
};

export default QuestionList;
