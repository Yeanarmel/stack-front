import { useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import API from "../api/api";

const LeaderboardPage = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await API.get("/users/top");
        setUsers(res.data); // backend already sorts by reputation
      } catch (err) {
        console.error("Failed to load leaderboard", err);
      }
    };

    fetchUsers();
  }, []);

  return (
    <DashboardLayout>
      <h1 className="text-xl sm:text-2xl font-bold mb-6">Leaderboard</h1>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        {/* Desktop Table */}
        <table className="w-full text-left hidden sm:table">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-4">Rank</th>
              <th className="p-4">User</th>
              <th className="p-4">Points</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id} className="border-t hover:bg-gray-50 transition">
                <td className="p-4">#{index + 1}</td>
                <td className="p-4 flex items-center gap-3">
                  <img
                    src={user.avatar || `https://ui-avatars.com/api/?name=${user.name}`}
                    alt={user.name}
                    className="w-8 h-8 rounded-full"
                  />
                  <span className="font-medium">{user.name}</span>
                </td>
                <td className="p-4">
                  <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-semibold">
                    {user.reputation}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Mobile Cards */}
        <div className="sm:hidden divide-y">
          {users.map((user, index) => (
            <div key={user._id} className="p-4 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <span className="font-medium">#{index + 1}</span>
                <img
                  src={user.avatar || `https://ui-avatars.com/api/?name=${user.name}`}
                  alt={user.name}
                  className="w-8 h-8 rounded-full"
                />
                <span className="font-medium">{user.name}</span>
              </div>
              <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-semibold">
                {user.reputation}
              </span>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default LeaderboardPage;
