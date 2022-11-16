const mongoose = require("mongoose");

const playerSchema = new mongoose.Schema({
  username: { required: true, type: String },
  gamesPlayed: { default: 0, type: Number },
  score: { default: 0, type: Number },
});

module.exports = mongoose.model("Player", playerSchema);
