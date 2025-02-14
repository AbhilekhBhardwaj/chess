import { useEffect, useState } from "react";
import { Chess } from "chess.js";
import socket from "../utils/socket";

const ChessBoard = () => {
  const [game, setGame] = useState(new Chess());
  const [fen, setFen] = useState(game.fen());

  useEffect(() => {
    socket.on("move", (move) => {
      const newGame = new Chess(game.fen());
      newGame.move(move);
      setGame(newGame);
      setFen(newGame.fen());
    });

    return () => socket.off("move");
  }, [game]);

  const makeMove = (from, to) => {
    const move = game.move({ from, to });
    if (move) {
      socket.emit("move", move);
      setFen(game.fen());
    }
  };

  return (
    <div className="grid grid-cols-8 gap-1 border p-4 w-fit">
      {game.board().flat().map((square, index) => (
        <div key={index} className="w-12 h-12 flex items-center justify-center
          bg-gray-300 text-xl font-bold cursor-pointer"
          onClick={() => console.log(square?.square)}>
          {square ? square.type.toUpperCase() : ""}
        </div>
      ))}
    </div>
  );
};

export default ChessBoard;
