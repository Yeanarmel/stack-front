const TopUsers = () => {
  const users = [
    { name: "Sarah Connor", rep: 1540 },
    { name: "John Doe", rep: 1230 },
    { name: "Emily White", rep: 980 },
  ];

  return (
    <div className="bg-white p-4 rounded-xl border">
      <h3 className="font-semibold mb-4">Top Users</h3>
      {users.map((u, i) => (
        <div key={i} className="flex items-center gap-3 mb-3">
          <img src={`https://i.pravatar.cc/40?img=${i + 5}`} className="rounded-full" />
          <div>
            <p className="font-medium">{u.name}</p>
            <p className="text-sm text-gray-500">{u.rep} reputation</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TopUsers;
