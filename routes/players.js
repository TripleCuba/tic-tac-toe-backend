const { json } = require("express");
const express = require("express");
const { find } = require("../models/playerModule");
const router = express.Router();
const Player = require("../models/playerModule");

router.get("/", async (req, res) => {
  try {
    const players = await Player.find();
    res.json(players);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
router.get("/:name", async (req, res) => {
  try {
    const player = await Player.find({ username: req.params.name });
    !player
      ? res.status(404).json({ message: "no player found" })
      : res.json(player);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/add", async (req, res) => {
  const player = new Player({
    username: req.body.username,
  });
  try {
    const newPlayer = await player.save();
    res.status(201).json(newPlayer);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
router.patch("/:id", async (req, res) => {
  try {
    const player = await Player.findById(req.params.id);
    const newPlayer = Object.assign(player, req.body);
    newPlayer.save();
    res.status(201).json(player);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
});

async function getPLayer(req, res, next) {
  let player;
  try {
    player = await Player.findById(req.params.id);
    !player && res.status(404).json({ message: "player not exists " });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.player = player;
  next();
}
module.exports = router;
