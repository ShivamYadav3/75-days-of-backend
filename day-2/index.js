const http = require("node:http");
const hostname = "localhost"; // loopback ip or localhost
const port = 8000; // OS - 65500
const URL = require("node:url");
const { data } = require("./data");

const server = http.createServer((req, res) => {
  res.statusCode = 200;

  const { url } = req;
  const parsedURL = URL.parse(url, true);
  const { pathname, query } = parsedURL;

  console.log("parsedURL: ", parsedURL);
  // console.log(req.url, q);
  res.setHeader("Content-Type", "application/json");
  // const payload = {
  //   name: "shivam",
  //   city: "jabalpur",
  //   Lname: "yadav",
  // };
  if (pathname === "/") {
    // Root URL requested
    res.end("Welcome to Card book");
  } else if (pathname === "/greetings") {
    const message = `Hello ${query.name ? query.name : "there"}`;
    res.end(message);
  } else if (pathname === "/products") {
    res.end(JSON.stringify(data));
  } else {
    res.end("Unknown request");
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
