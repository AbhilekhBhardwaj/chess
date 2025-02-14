import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white">
      <h1 className="text-4xl font-bold">Welcome to ChessApp</h1>
      <p className="mt-4">Play online chess with your friends!</p>
      <Link to="/game" className="mt-6 p-3 bg-blue-500 text-white rounded">Start Playing</Link>
    </div>
  );
};

export default Home;
