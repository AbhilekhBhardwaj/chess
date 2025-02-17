import Game from "../models/Game.js";

// Create a new game
export const createGame = async (req, res) => {
  try {
    const game = new Game({ players: req.body.players });
    await game.save();
    res.status(201).json(game);
  } catch (error) {
    res.status(500).json({ error: "Error creating game" });
  }
};

// Get game state
export const getGame = async (req, res) => {
  try {
    const game = await Game.findById(req.params.gameId);
    if (!game) return res.status(404).json({ error: "Game not found" });
    res.json(game);
  } catch (error) {
    res.status(500).json({ error: "Error fetching game" });
  }
};
