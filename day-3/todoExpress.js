const express = require("express");
const app = express();
const PORT = 7001;
const todo = require("./todo.json");

app.use(express.json());

app.get("/", (req, res) => {
  res.send(todo);
});

app.post("/", (req, res) => {
  const data = { ...req.body };
  console.log(data);
  todo.push(data);
  res.send(data);
});

app.delete("/:id", (req, res) => {
  const id = req.params.id;
  const index = todo.findIndex((item) => item.id == id);
  if (index > 0) {
    todo.splice(index, 1);
  }
  res.send(id);
});

app.put("/:id", (req, res) => {
  const id = req.params.id;
  const index = todo.findIndex((item) => item.id == id);
  todo[index] = { ...req.body };
  res.send(req.body);
});

app.patch("/:id", (req, res) => {
  const id = req.params.id;
  const index = todo.findIndex((item) => item.id == id);
  todo[index] = { ...todo[index], ...req.body };
  res.send(req.body);
});

app.listen(PORT, () => {
  console.log(`server is running in http://localhost:${PORT}`);
});
