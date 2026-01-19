import { Home, Tag, Trophy, HelpCircle, X, LogOut } from "lucide-react";
import { Link, NavLink, useNavigate } from "react-router-dom";

const Sidebar = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const linkBase =
    "flex items-center gap-4 px-4 py-2 rounded-lg font-medium transition";

  // ✅ Logout function
  const handleLogout = () => {
    localStorage.removeItem("token"); // remove JWT
    // Optional: remove other user info from localStorage
    // localStorage.removeItem("user");
    navigate("/login"); // redirect to login page
  };

  return (
    <aside
      className={`
        fixed top-0 left-0 z-50
        h-screen w-64 bg-white border-r
        transform transition-transform duration-300
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0 md:top-16 md:h-[calc(100vh-4rem)]
        flex flex-col
      `}
    >
      {/* MOBILE HEADER */}
      <div className="md:hidden flex items-center justify-between p-4 border-b">
        <span className="font-bold text-blue-600">Developer Bug Zone</span>
        <button onClick={onClose}>
          <X size={22} />
        </button>
      </div>

      {/* NAV LINKS */}
      <nav className="flex-1 overflow-y-auto p-4 space-y-2">
        <NavLink
          to="/"
          onClick={onClose}
          className={({ isActive }) =>
            `${linkBase} ${isActive ? "bg-blue-50 text-blue-700" : "text-gray-600 hover:bg-blue-50"}`
          }
        >
          <Home size={20} /> Home
        </NavLink>

        <NavLink
          to="/questions"
          onClick={onClose}
          className={({ isActive }) =>
            `${linkBase} ${isActive ? "bg-blue-50 text-blue-700" : "text-gray-600 hover:bg-blue-50"}`
          }
        >
          <HelpCircle size={20} /> Questions
        </NavLink>

        <NavLink
          to="/tags"
          onClick={onClose}
          className={({ isActive }) =>
            `${linkBase} ${isActive ? "bg-blue-50 text-blue-700" : "text-gray-600 hover:bg-blue-50"}`
          }
        >
          <Tag size={20} /> Tags
        </NavLink>

        <NavLink
          to="/leaderboard"
          onClick={onClose}
          className={({ isActive }) =>
            `${linkBase} ${isActive ? "bg-blue-50 text-blue-700" : "text-gray-600 hover:bg-blue-50"}`
          }
        >
          <Trophy size={20} /> Leaderboard
        </NavLink>
      </nav>

      {/* LOGOUT */}
      <div className="p-4 border-t">
        <button
          onClick={() => {
            handleLogout();
            onClose(); // close sidebar
          }}
          className="w-full bg-blue-700 text-white py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-blue-800"
        >
          <LogOut size={18} /> Log Out
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
