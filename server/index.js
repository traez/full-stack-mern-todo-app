const express = require("express");
const cors = require('cors');
const router = require("./routes");
const path = require("path");
const { connectToMongoDB } = require("./database");
require("dotenv").config();

const port = process.env.PORT;
const app = express();

app.use(express.static(path.join(__dirname, "build")));
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "build/index.html"));
})
app.use("/api", router);

async function startServer() {
  await connectToMongoDB();
  app.listen(port, () => {
      console.log(`Server is listening on http://localhost:${port}`);
  });
}
startServer();
