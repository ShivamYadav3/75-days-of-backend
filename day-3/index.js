const express = require("express");
const app = express();
const PORT = 7001;

app.get("/", (req, res) => {
  console.log("home");
  res.send({ message: "with express" });
});

app.get("/greetings", (req, res) => {
  const { name } = req.query;
  res.send(`welcome ${name || "there"} to greetings route`);
});

app.get("/html", (request, response) => {
  response.set("Content-Type", "text/plain");
  response.send("<h1>Hello NodeJS</h1>");
});

app.listen(PORT, () => {
  console.log(`the server is running on http://localhost:${PORT}`);
});
