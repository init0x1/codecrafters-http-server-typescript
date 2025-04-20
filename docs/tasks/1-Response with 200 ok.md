# Response with 200 OK

## Task Overview
In this stage, you need to build a server that responds to an HTTP request with a `200 OK` response.

## HTTP Response Structure
An HTTP response consists of three parts separated by CRLF (`\r\n`):
1. Status line (e.g., `HTTP/1.1 200 OK`)
2. Headers (optional)
3. Response body (optional)

For this task, your server only needs to send a status line:
```
HTTP/1.1 200 OK\r\n\r\n
```

## Testing Criteria
The tester will:
1. Execute your program
2. Send an HTTP GET request to your server: `curl -v http://localhost:4221`
3. Verify that your server responds with: `HTTP/1.1 200 OK\r\n\r\n`

## Solution Workflow

Here's how I approached solving this task:

1. **Created a TCP server** using Node.js's `net` module
2. **Set up a connection handler** to process incoming client connections
3. **Sent the HTTP response** with status code 200 OK
4. **Handled connection closure** properly
5. **Started the server** on port 4221

## Implementation Notes

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

### Key Components:

1. **Importing the net Module**
   - Used Node.js's built-in `net` module for creating a TCP server

2. **Creating the TCP Server**
   - Created a server that handles incoming connections
   - Each connection is represented by a socket object

3. **Sending an HTTP Response**
   - When a client connects, immediately sent the required HTTP response
   - Used `Buffer.from()` to convert the string to a binary buffer for network transmission

4. **Handling Connection Closure**
   - Set up an event listener for the "close" event
   - Ensured the socket is properly closed when the connection ends

5. **Listening on a Port**
   - Started the server on port 4221
   - Added a console log to indicate the server is running

This implementation uses the low-level `net` module rather than the higher-level `http` module, providing a better understanding of how HTTP works at the TCP level.