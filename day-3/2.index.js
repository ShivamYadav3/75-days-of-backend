const Fastify = require("fastify");
const fastify = Fastify();
const PORT = 3001;

fastify.get("/", (req, res) => {
  return { message: "Welcome to my first fastify App" };
});

fastify.get("/greetings", (req, res) => {
  const { name } = req.query;
  res.send(`welcome ${name || "there"} to greetings route from fastify`);
});

fastify.get("/html", (req, res) => {
  res.set("Content-Type", "text/plain");
  res.send("<h1>Hello NodeJS</h1>");
  //error
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
