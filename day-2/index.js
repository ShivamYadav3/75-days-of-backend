const http = require("node:http");
const hostname = "localhost"; // loopback ip or localhost
const port = 8000; // OS - 65500

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  const payload = {
    name: "shivam",
    city: "jabalpur",
    Lname: "yadav",
  };
  res.end(JSON.stringify(payload));
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
