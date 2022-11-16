require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
app.use(cors());

mongoose.connect(process.env.DATABASE_URI);
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("connected to database"));

app.use(express.json());
const playersRouter = require("./routes/players");
app.use("/players", playersRouter);

app.listen(7000, () => console.log("server Started"));
