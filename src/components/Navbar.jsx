import { Menu, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../api/api";

const Navbar = ({ onMenuClick }) => {
  const [user, setUser] = useState(null); // ✅ object or null

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const res = await API.get("/users/me");
        setUser(res.data.user); // ✅ correct
      } catch (err) {
        console.log("User not logged in");
        setUser(null);
      }
    };

    fetchCurrentUser();
  }, []);

  return (
    <header className="w-full bg-white border-b px-4 md:px-6 py-3 flex items-center justify-between gap-4 z-40">

      {/* LEFT */}
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="md:hidden p-2 rounded hover:bg-gray-100"
        >
          <Menu size={24} />
        </button>

        <h1 className="text-lg md:text-xl font-bold text-blue-600">
          Developer Bug Zone
        </h1>
      </div>

      {/* SEARCH */}
      <div className="hidden md:flex flex-1 max-w-xl">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            className="w-full border rounded-lg pl-10 pr-4 py-2
            focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Search questions..."
          />
        </div>
      </div>

      {/* PROFILE */}
      {user ? (
        <Link to={`/users/${user._id}`}>
          <div className="flex items-center gap-2">
            <img
              src={`https://ui-avatars.com/api/?name=${user.name}`}
              className="w-9 h-9 rounded-full"
              
            />
            <span className="hidden md:inline font-medium">
              {user.name}
            </span>
          </div>
        </Link>
      ) : (
        <Link to="/login" className="font-medium text-blue-600">
          Login
        </Link>
      )}

    </header>
  );
};

export default Navbar;
