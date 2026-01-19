import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ThumbsUp, ThumbsDown, MessageSquare } from "lucide-react";
import DashboardLayout from "../layouts/DashboardLayout";
import API from "../api/api";

const QuestionDetailsPage = () => {
  const { id } = useParams();

  const [question, setQuestion] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [questionVotes, setQuestionVotes] = useState({ upvotes: 0, downvotes: 0 });
  const [answerVotes, setAnswerVotes] = useState({});
  const [userVotes, setUserVotes] = useState({});
  const [newAnswer, setNewAnswer] = useState("");
  const [comments, setComments] = useState({}); // { postId: [comments] }
  const [newComment, setNewComment] = useState({}); // { postId: text }

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Question
        const qRes = await API.get(`/questions/${id}`);
        setQuestion(qRes.data);

        // Answers
        const aRes = await API.get(`/answers/${id}`);
        setAnswers(aRes.data);

        // Question votes
        const qVoteRes = await API.get(`/votes/question/${id}`);
        setQuestionVotes(qVoteRes.data);

        // Answer votes
        const voteCounts = {};
        for (const ans of aRes.data) {
          const vRes = await API.get(`/votes/answer/${ans._id}`);
          voteCounts[ans._id] = vRes.data;
        }
        setAnswerVotes(voteCounts);

        // Comments for question
        const cRes = await API.get(`/comments?postType=question&postId=${id}`);
        setComments((prev) => ({ ...prev, [id]: cRes.data }));

        // Comments for each answer
        for (const ans of aRes.data) {
          const acRes = await API.get(`/comments?postType=answer&postId=${ans._id}`);
          setComments((prev) => ({ ...prev, [ans._id]: acRes.data }));
        }
      } catch (err) {
        console.error("Failed to fetch data:", err);
      }
    };

    fetchData();
  }, [id]);

  // Voting handler
  const handleVote = async (postType, postId, voteType) => {
    try {
      await API.post("/votes", { postType, postId, voteType });

      const vRes = await API.get(`/votes/${postType}/${postId}`);
      if (postType === "question") setQuestionVotes(vRes.data);
      else
        setAnswerVotes((prev) => ({ ...prev, [postId]: vRes.data }));

      setUserVotes((prev) => ({ ...prev, [postId]: voteType }));
    } catch (err) {
      console.error("Vote failed:", err);
      alert(err.response?.data?.message || "Voting failed");
    }
  };

  // Post new answer
  const handlePostAnswer = async () => {
    if (!newAnswer.trim()) return;
    try {
      const res = await API.post(`/answers/${id}`, { body: newAnswer });
      setAnswers((prev) => [res.data.answer, ...prev]);
      setNewAnswer("");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to post answer");
    }
  };

  // Post new comment
  const handlePostComment = async (postId, postType) => {
    if (!newComment[postId]?.trim()) return;
    try {
      const res = await API.post("/comments", {
        body: newComment[postId],
        postId,
        postType,
      });

      setComments((prev) => ({
        ...prev,
        [postId]: [...(prev[postId] || []), res.data.comment],
      }));

      setNewComment((prev) => ({ ...prev, [postId]: "" }));
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to post comment");
    }
  };

  if (!question) return <DashboardLayout>Loading...</DashboardLayout>;

  const voteColor = (postId, type) =>
    userVotes[postId] === type
      ? type === "up"
        ? "text-green-600"
        : "text-red-600"
      : "text-gray-600 hover:" + (type === "up" ? "text-green-600" : "text-red-600");

  return (
    <DashboardLayout>
      {/* QUESTION */}
      <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
        <h1 className="text-xl sm:text-2xl font-bold">{question.title}</h1>
        <p className="mt-4 text-gray-700">{question.body}</p>
        <div className="mt-4 flex gap-2 flex-wrap">
          {question.tags?.map((tag) => (
            <span key={tag} className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs">
              #{tag}
            </span>
          ))}
        </div>
        <div className="mt-4 flex items-center gap-4">
          <button onClick={() => handleVote("question", question._id, "up")} className={`flex items-center gap-2 ${voteColor(question._id, "up")}`}>
            <ThumbsUp size={18} /> {questionVotes.upvotes}
          </button>
          <button onClick={() => handleVote("question", question._id, "down")} className={`flex items-center gap-2 ${voteColor(question._id, "down")}`}>
            <ThumbsDown size={18} /> {questionVotes.downvotes}
          </button>
          <span className="flex items-center gap-2">
            <MessageSquare size={18} /> {answers.length} answers
          </span>
        </div>

        {/* COMMENTS FOR QUESTION */}
        <div className="mt-4 space-y-2">
          <h3 className="font-semibold">Comments</h3>
          {(comments[question._id] || []).map((c) => (
            <div key={c._id} className="text-sm text-gray-700">
              <span className="font-semibold">{c.userId?.name || "Unknown"}: </span>
              {c.body}
            </div>
          ))}
          <div className="flex gap-2 mt-1">
            <input
              type="text"
              value={newComment[question._id] || ""}
              onChange={(e) =>
                setNewComment((prev) => ({ ...prev, [question._id]: e.target.value }))
              }
              placeholder="Add a comment"
              className="border px-2 py-1 rounded-lg flex-1"
            />
            <button
              onClick={() => handlePostComment(question._id, "question")}
              className="bg-blue-700 text-white px-3 py-1 rounded-lg"
            >
              Post
            </button>
          </div>
        </div>
      </div>

      {/* ANSWERS */}
      <div className="space-y-6">
        <h2 className="text-lg font-semibold">Answers</h2>

        {/* Post new answer */}
        <div className="bg-white p-4 rounded-xl shadow-sm">
          <textarea
            value={newAnswer}
            onChange={(e) => setNewAnswer(e.target.value)}
            placeholder="Write your answer..."
            rows={4}
            className="w-full border rounded-lg px-3 py-2"
          />
          <button onClick={handlePostAnswer} className="mt-2 bg-green-600 text-white px-4 py-2 rounded-lg">
            Post Answer
          </button>
        </div>

        {answers.map((answer) => (
          <div key={answer._id} className="bg-white p-4 rounded-xl shadow-sm">
            <p className="text-gray-700">{answer.body}</p>
            <div className="mt-1 text-sm text-gray-500">{answer.userId?.name || "Unknown"}</div>

            {/* Answer votes */}
            <div className="mt-2 flex gap-2">
              <button onClick={() => handleVote("answer", answer._id, "up")} className={`flex items-center gap-1 ${voteColor(answer._id, "up")}`}>
                <ThumbsUp size={16} /> {answerVotes[answer._id]?.upvotes || 0}
              </button>
              <button onClick={() => handleVote("answer", answer._id, "down")} className={`flex items-center gap-1 ${voteColor(answer._id, "down")}`}>
                <ThumbsDown size={16} /> {answerVotes[answer._id]?.downvotes || 0}
              </button>
            </div>

            {/* COMMENTS FOR ANSWER */}
            <div className="mt-2 space-y-1">
              {(comments[answer._id] || []).map((c) => (
                <div key={c._id} className="text-sm text-gray-700">
                  <span className="font-semibold">{c.userId?.name || "Unknown"}: </span>
                  {c.body}
                </div>
              ))}
              <div className="flex gap-2 mt-1">
                <input
                  type="text"
                  value={newComment[answer._id] || ""}
                  onChange={(e) =>
                    setNewComment((prev) => ({ ...prev, [answer._id]: e.target.value }))
                  }
                  placeholder="Add a comment"
                  className="border px-2 py-1 rounded-lg flex-1"
                />
                <button
                  onClick={() => handlePostComment(answer._id, "answer")}
                  className="bg-blue-700 text-white px-3 py-1 rounded-lg"
                >
                  Post
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
};

export default QuestionDetailsPage;
