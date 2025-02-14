import ChessBoard from "../components/ChessBoard";
import MoveHistory from "../components/MoveHistory";
import ChatBox from "../components/ChatBox";

const GameRoom = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white">
      <h1 className="text-2xl mb-4">Chess Game</h1>
      <div className="flex gap-4">
        <ChessBoard />
        <MoveHistory />
        <ChatBox />
      </div>
    </div>
  );
};

export default GameRoom;
