import { useEffect, useState } from "react";
import { Chess } from "chess.js";
import { Chessboard } from "react-chessboard";
import socket from "../utils/socket";

const ChessBoard = ({ gameId }) => {
  const [game, setGame] = useState(new Chess());

  useEffect(() => {
    socket.emit("joinGame", gameId);

    socket.on("gameState", (gameState) => {
      const newGame = new Chess();
      gameState.moves.forEach((move) => newGame.move(move));
      setGame(newGame);
    });

    return () => socket.off("gameState");
  }, [gameId]);

  const makeMove = (move) => {
    try {
      const newGame = new Chess(game.fen());
      const moveResult = newGame.move(move);
      if (moveResult) {
        setGame(newGame);
        socket.emit("move", { gameId, move });
      }
    } catch (error) {
      console.log("Invalid move:", error);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <Chessboard
        position={game.fen()}
        onPieceDrop={(source, target) => {
          makeMove({ from: source, to: target, promotion: "q" });
        }}
        boardWidth={500}
        arePiecesDraggable={true}
      />
    </div>
  );
};

export default ChessBoard;
