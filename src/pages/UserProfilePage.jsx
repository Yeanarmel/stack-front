import { useState } from "react";
import { Edit3, Award } from "lucide-react";
import QuestionList from "../components/QuestionList";
import DashboardLayout from "../layouts/DashboardLayout";

const UserProfilePage = () => {

  const user = {
    name: "John Doe",
    username: "@johndoe",
    bio: "Software engineer passionate about React, Node.js and teaching others.",
    avatar: "https://i.pravatar.cc/120?img=12",
    reputation: 1240,
    badges: ["Top Answerer", "Bug Hunter", "Contributor"],
  };

  return (
    <DashboardLayout>
      <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-4">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-24 h-24 rounded-full"
            />
            <div>
              <h1 className="text-xl font-bold text-gray-800">
                {user.name}
              </h1>
              <p className="text-sm text-gray-500">{user.username}</p>
              <p className="mt-2 text-sm text-gray-600">{user.bio}</p>
            </div>
          </div>

          <button className="flex items-center gap-2 rounded-lg border px-4 py-2 text-sm hover:bg-gray-100">
            <Edit3 size={16} /> Edit Profile
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-xl p-4 text-center shadow-sm">
          <p className="text-2xl font-bold text-blue-700">
            {user.reputation}
          </p>
          <p className="text-sm text-gray-500">Reputation</p>
        </div>
        <div className="bg-white rounded-xl p-4 text-center shadow-sm">
          <p className="text-2xl font-bold text-gray-800">34</p>
          <p className="text-sm text-gray-500">Questions</p>
        </div>
        <div className="bg-white rounded-xl p-4 text-center shadow-sm">
          <p className="text-2xl font-bold text-gray-800">128</p>
          <p className="text-sm text-gray-500">Answers</p>
        </div>
      </div>

      {/* Badges */}
      <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Award size={18} /> Badges
        </h2>
        <div className="flex flex-wrap gap-3">
          {user.badges.map((badge, index) => (
            <span
              key={index}
              className="rounded-full bg-blue-50 px-4 py-1.5 text-sm text-blue-700"
            >
              {badge}
            </span>
          ))}
        </div>
      </div>

      {/* User Questions */}
      <section>
        <h2 className="text-lg font-semibold mb-4">Recent Questions</h2>
        <QuestionList />
      </section>
    </DashboardLayout>
  );
};

export default UserProfilePage;
