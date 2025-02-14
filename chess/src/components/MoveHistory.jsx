import { useEffect, useState } from "react";
import socket from "../utils/socket";

const MoveHistory = () => {
  const [moves, setMoves] = useState([]);

  useEffect(() => {
    socket.on("move", (move) => {
      setMoves((prevMoves) => [...prevMoves, move.san]);
    });

    return () => socket.off("move");
  }, []);

  return (
    <div className="p-4 border h-40 overflow-auto">
      <h2 className="text-lg font-bold">Move History</h2>
      <ul>
        {moves.map((move, index) => (
          <li key={index}>{index + 1}. {move}</li>
        ))}
      </ul>
    </div>
  );
};

export default MoveHistory;
