const Leaderboard = () => {
  const players = [
    { name: "Player1", rating: 2000 },
    { name: "Player2", rating: 1800 },
    { name: "Player3", rating: 1600 }
  ];

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white">
      <h1 className="text-2xl mb-4">Leaderboard</h1>
      <table className="border-collapse border w-1/2 text-center">
        <thead>
          <tr className="bg-gray-700">
            <th className="border p-2">Rank</th>
            <th className="border p-2">Player</th>
            <th className="border p-2">Rating</th>
          </tr>
        </thead>
        <tbody>
          {players.map((player, index) => (
            <tr key={index} className="bg-gray-800">
              <td className="border p-2">{index + 1}</td>
              <td className="border p-2">{player.name}</td>
              <td className="border p-2">{player.rating}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Leaderboard;
