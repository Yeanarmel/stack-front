import DashboardLayout from "../layouts/DashboardLayout";

const LeaderboardPage = () => {
  const users = [
    { id: 1, name: "Alice Johnson", points: 12430 },
    { id: 2, name: "Bob Smith", points: 11020 },
    { id: 3, name: "Jane Doe", points: 9850 },
  ];

  return (
    <DashboardLayout>
        <h1 className="text-xl sm:text-2xl font-bold mb-6">Leaderboard</h1>

        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
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
                <tr key={user.id} className="border-t">
                <td className="p-4">#{index + 1}</td>
                <td className="p-4">{user.name}</td>
                <td className="p-4 font-semibold">{user.points}</td>
                </tr>
            ))}
            </tbody>
        </table>

        {/* Mobile cards */}
        <div className="sm:hidden divide-y">
            {users.map((user, index) => (
            <div key={user.id} className="p-4 flex justify-between">
                <div>
                <p className="font-medium">#{index + 1} {user.name}</p>
                </div>
                <p className="font-semibold">{user.points}</p>
            </div>
            ))}
        </div>
        </div>
    </DashboardLayout>
  );
};

export default LeaderboardPage;
