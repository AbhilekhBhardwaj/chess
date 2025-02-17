import { useParams } from "react-router-dom";
import ChessBoard from "../components/ChessBoard";

const GameRoom = () => {
  const { gameId } = useParams();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white">
      <h1 className="text-2xl font-bold mb-4">Game ID: {gameId}</h1>
      <ChessBoard gameId={gameId} />
    </div>
  );
};

export default GameRoom;
