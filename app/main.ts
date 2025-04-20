import * as net from "net";

// You can use print statements as follows for debugging, they'll be visible when running tests.
console.log("Logs from your program will appear here!");


const server = net.createServer((socket: net.Socket) => {
  socket.on("close", () => {
    socket.end();
  });
});

const PORT = 4221;

server.listen(PORT, () => {
  console.log(`Server is listening on http://localhost:${PORT}`);
 });
