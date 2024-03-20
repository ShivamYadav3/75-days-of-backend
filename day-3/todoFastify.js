const Fastify = require("fastify");
const fastify = Fastify();
const PORT = 3001;
const todo = require("./todo.json");

fastify.get("/", (req, res) => {
  return todo;
});

fastify.post("/", (req, res) => {
  const data = { ...req.body };
  console.log(data);
  todo.push(data);
  res.send(data);
});

fastify.delete("/:id", (req, res) => {
  const id = req.params.id;
  const index = todo.findIndex((item) => item.id == id);
  if (index > 0) {
    todo.splice(index, 1);
  }
  res.send(id);
});

fastify.put("/:id", (req, res) => {
  const id = req.params.id;
  const index = todo.findIndex((item) => item.id == id);
  todo[index] = { ...req.body };
  res.send(req.body);
});

fastify.patch("/:id", (req, res) => {
  const id = req.params.id;
  const index = todo.findIndex((item) => item.id == id);
  todo[index] = { ...todo[index], ...req.body };
  res.send(req.body);
});

(async () => {
  try {
    await fastify.listen({ port: PORT });
    //DB Connection
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
})();
