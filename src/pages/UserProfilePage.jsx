import { useEffect, useState } from "react";
import { Edit3, Award } from "lucide-react";
import { useParams } from "react-router-dom";
import API from "../api/api";
import QuestionList from "../components/QuestionList";
import DashboardLayout from "../layouts/DashboardLayout";

const UserProfilePage = () => {
  const { id } = useParams();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await API.get(`/users/${id}`);
        setUser(res.data);
        console.log(res.data)
      } catch (err) {
        console.error("Failed to load user profile");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  if (loading) {
    return (
      <DashboardLayout>
        <p className="text-gray-500">Loading profile...</p>
      </DashboardLayout>
    );
  }

  if (!user) {
    return (
      <DashboardLayout>
        <p className="text-red-500">User not found</p>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      {/* PROFILE HEADER */}
      <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">

          <div className="flex items-start gap-4">
            <img
              src={`https://ui-avatars.com/api/?name=${user.name}`}
              alt={user.name}
              className="w-24 h-24 rounded-full object-cover"
            />

            <div>
              <h1 className="text-xl font-bold text-gray-800">
                {user.name}
              </h1>
              <p className="text-sm text-gray-500">
                @{user.name}
              </p>
                <p className="mt-2 text-sm text-gray-600 max-w-xl">
                  {user.email}
                </p>
            </div>
          </div>

          {/* Show edit only on own profile */}
          {user.isOwner && (
            <button className="flex items-center gap-2 rounded-lg border px-4 py-2 text-sm hover:bg-gray-100">
              <Edit3 size={16} />
              Edit Profile
            </button>
          )}
        </div>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <StatCard value={user.reputation} label="Reputation" highlight />
        <StatCard value={user.questionsCount} label="Questions" />
        <StatCard value={user.answersCount} label="Answers" />
      </div>

      {/* BADGES */}
      <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Award size={18} />
          Badges
        </h2>

        {user.badges?.length ? (
          <div className="flex flex-wrap gap-3">
            {user.badges.map((badge) => (
              <span
                key={badge}
                className="rounded-full bg-blue-50 px-4 py-1.5 text-sm text-blue-700"
              >
                {badge}
              </span>
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-500">No badges yet</p>
        )}
      </div>

      {/* USER QUESTIONS */}
      <section>
        <h2 className="text-lg font-semibold mb-4">
          Recent Questions
        </h2>
        <QuestionList userId={user._id} />
      </section>
    </DashboardLayout>
  );
};

export default UserProfilePage;

/* ------------------------ */
/* STAT CARD COMPONENT */
/* ------------------------ */
const StatCard = ({ value, label, highlight }) => (
  <div className="bg-white rounded-xl p-4 text-center shadow-sm">
    <p
      className={`text-2xl font-bold ${
        highlight ? "text-blue-700" : "text-gray-800"
      }`}
    >
      {value ?? 0}
    </p>
    <p className="text-sm text-gray-500">{label}</p>
  </div>
);
