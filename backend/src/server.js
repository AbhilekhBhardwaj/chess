import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { createServer } from "http";
import { Server } from "socket.io";
import mongoose from "mongoose";
import Game from "./models/Game.js";

dotenv.config();

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB Connection Error:", err));

// Handle Chess Moves in Real-time
io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  socket.on("joinGame", async (gameId) => {
    socket.join(gameId);
    const game = await Game.findById(gameId);
    if (game) {
      io.to(gameId).emit("gameState", game);
    }
  });

  socket.on("move", async ({ gameId, move }) => {
    const game = await Game.findById(gameId);
    if (game) {
      game.moves.push(move);
      await game.save();
      io.to(gameId).emit("gameState", game);
    }
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
