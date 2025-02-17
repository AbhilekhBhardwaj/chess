import mongoose from "mongoose";

const gameSchema = new mongoose.Schema({
  moves: { type: [String], default: [] },
  players: { type: [String], required: true }, // Player IDs
  status: { type: String, default: "ongoing" }, // ongoing, finished
});

export default mongoose.model("Game", gameSchema);
