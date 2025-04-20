# 1. Response with 200

## **Overview**

The code creates a TCP server using Node's `net` module. When a client connects, the server responds with a basic HTTP 200 OK response and then closes the connection.

---

## **Code Explanation**

```typescript
import * as net from "net";

const server = net.createServer((socket: net.Socket) => {
  socket.write(Buffer.from(`HTTP/1.1 200 OK\r\n\r\n`));
  socket.on("close", () => {
    socket.end();
  });
});

const PORT = 4221;

server.listen(PORT, () => {
  console.log(`Server is listening on http://localhost:${PORT}`);
});
```

---

## **Detailed Breakdown**

**1. Importing the net Module**

- `import * as net from "net";`
    - Imports Node.js's built-in `net` module, which provides an asynchronous network API for creating stream-based TCP servers and clients.


**2. Creating the TCP Server**

- `const server = net.createServer((socket: net.Socket) => { ... });`
    - Creates a new TCP server.
    - The callback receives a `socket` object representing the connection to the client.

**3. Sending an HTTP Response**

- `socket.write(Buffer.from(\`HTTP/1.1 200 OK\r\n\r\n\`));`
    - When a client connects, the server writes a minimal HTTP response (`HTTP/1.1 200 OK`) followed by the required carriage return and line feed (`\r\n\r\n`).
    - `Buffer.from()` converts the string to a binary buffer, which is required for network transmission [^1][^5][^9].

**4. Handling Connection Closure**

- `socket.on("close", () =>; { socket.end(); });`
    - Listens for the `"close"` event on the socket.
    - Ensures the socket is properly closed when the connection ends.

**6. Listening on a Port**

- `server.listen(PORT, () =>; { ... });`
    - Starts the server and listens for incoming connections on the specified port.
    - Logs a message indicating the server is running.

---

## **How This Differs from Typical HTTP Servers**

- This implementation uses the low-level `net` module, which operates at the TCP layer. It manually sends HTTP-formatted responses but does not parse HTTP requests or provide routing.
- Most HTTP servers in Node.js use the higher-level `http` module, which automatically handles HTTP parsing, headers, and routing[^1][^5][^9].
- This approach is educational for understanding how HTTP works over TCP but is not recommended for production use due to lack of features and security.


[^1]: https://ahdeyy.hashnode.dev/building-a-typescript-http-server

[^2]: https://codesandbox.io/p/sandbox/typescript-http-server-7f3nq

[^3]: https://javascript.plainenglish.io/set-up-a-node-js-express-web-server-api-using-typescript-e2737b34157f

[^4]: https://github.com/Caceresenzo/codecrafters--build-your-own-http--typescript

[^5]: https://jsandtsmastery.com/2/13/4/

[^6]: https://www.linode.com/docs/guides/using-nodejs-typescript-and-express-to-build-a-web-server/

[^7]: https://www.youtube.com/watch?v=patkLXskt88

[^8]: https://www.webdevtutor.net/blog/typescript-createserver

[^9]: https://blog.logrocket.com/build-rest-api-typescript-using-native-modules/

[^10]: https://jh123x.com/projects/typescript-http-server/

