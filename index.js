require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI); 

app.use("/user",require("./routes/user"));
app.use("/employee", require('./routes/employee'));
app.get("/", (req, res) => {
  res.send("Server is up and running");
});
app.listen(process.env.PORT, () => {
  console.log(`Server running at http://localhost:${process.env.PORT}`);
});