import * as net from "net";

function parseHttpRequest(data: Buffer): { path: string, method: string } {
  const requestLine = data.toString().split('\r\n')[0];
  const [method, path] = requestLine.split(' ');
  return { method, path };
}

const server = net.createServer((socket: net.Socket) => {
  socket.on("data", (data: Buffer) => {
    const { method, path } = parseHttpRequest(data);
    let response = "";

    if (method === "GET" && path === "/") {
      response = "HTTP/1.1 200 OK\r\n\r\n";
    } else if (method === "GET" && path.startsWith("/echo/")) {
      const echoStr = path.substring(6);
      response =
        `HTTP/1.1 200 OK\r\nContent-Type: text/plain\r\nContent-Length: ${echoStr.length}\r\n\r\n${echoStr}`;
    } else {
      response = "HTTP/1.1 404 Not Found\r\n\r\n";
    }

    socket.write(Buffer.from(response));
    socket.end();
  });

  socket.on("close", () => {
    socket.end();
  });
});

const PORT = 4221;

server.listen(PORT, () => {
  console.log(`Server is listening on http://localhost:${PORT}`);
});
