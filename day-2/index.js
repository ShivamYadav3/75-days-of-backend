const http = require("node:http");
const hostname = "localhost"; // loopback ip or localhost
const port = 8000; // OS - 65500
const url = require("url");
const { data } = require("./data");

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  const q = url.parse(req.url, true).query;
  // console.log(req.url, q);
  res.setHeader("Content-Type", "application/json");
  // const payload = {
  //   name: "shivam",
  //   city: "jabalpur",
  //   Lname: "yadav",
  // };
  if (req.url == "/greetings") {
    res.end("hello there");
  } else if (req.url == "/products") {
    res.end(JSON.stringify(data));
  } else if (q.name) {
    res.end(`hello ${q.name}`);
  } else {
    res.end("Welcome to Card book");
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
