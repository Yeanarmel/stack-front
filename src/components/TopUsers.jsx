import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../api/api";

const TopUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchTopUsers = async () => {
      try {
        const res = await API.get("/users/top");
        setUsers(res.data);
      } catch (err) {
        console.error("Failed to load top users");
      }
    };

    fetchTopUsers();
  }, []);

  return (
    <div className="bg-white p-4 rounded-xl border">
      <h3 className="font-semibold mb-4">Top Users</h3>

      {users.slice(0, 3).map((user, index) => (
        <div key={user._id} className="flex items-center gap-3 mb-3">
          <img
            src={`https://ui-avatars.com/api/?name=${user.name}`}
            className="rounded-full w-9 h-9"
          />
          <div>
            <p className="font-medium">{user.name}</p>
            <p className="text-sm text-gray-500">{user.reputation} reputation</p>
          </div>
        </div>
      ))}

      {users.length > 3 && (
        <Link
          to="/leaderboard"
          className="text-blue-600 hover:underline font-medium mt-2 inline-block"
        >
          View More
        </Link>
      )}
    </div>
  );
};

export default TopUsers;
