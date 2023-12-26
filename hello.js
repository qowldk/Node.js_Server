const http = require("http"); // http 객체 생성

let count = 0;

// 노드 서버 객체 생성
const server = http.createServer((req, res) => {
  log(count);
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/plain");
  res.write("hello\n");
  setTimeout(() => {
    res.end("Node.js");
  }, 2000);
});

function log(count) {
  console.log((count += 1));
}

server.listen(8000, () => console.log("Hello Node.js")); // 접속 대기
