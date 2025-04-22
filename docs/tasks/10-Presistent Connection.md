# Persistent HTTP Connections

## Task Overview

In this stage, you will add support for persistent HTTP/1.1 connections. By default, HTTP/1.1 connections are persistent, allowing multiple requests and responses to be sent over the same TCP connection.

## Test Scenario

The tester will run your server and send two sequential requests over the same connection:

```bash
$ curl --http1.1 -v http://localhost:4221/echo/banana --next http://localhost:4221/user-agent -H "User-Agent: blueberry/apple-blueberry"
```

## Requirements

Your server must:
1. **Keep the TCP connection open** after the first request (unless the client asks to close it).
2. **Handle multiple requests** on the same connection, processing each independently.
3. **Return correct responses** for each request.
4. **Close the connection** only if the client sends a `Connection: close` header or uses HTTP/1.0.

## Notes

- In HTTP/1.1, connections are persistent by default unless the client specifies otherwise.
- Each request must be parsed and responded to independently, even if they arrive on the same connection.
- The server should not close the connection after each request unless instructed.

---

## Solution Workflow & Review

Here’s how you approached and solved the task:

1. **Request Parsing**  
   You parse each incoming request using your `parseHttpRequest` function, extracting the HTTP version and headers.

2. **Persistent Connection Logic**  
   You implemented a `notPersistentConnection` function that checks:
   - If the `Connection: close` header is present 

3. **Socket Handling**  
   In your `main.ts`, you:
   - Write the response to the socket for each request.
   - Only call `socket.end()` if `notPersistentConnection(request)` returns `true`.
   - Leave the connection open for further requests if the connection is persistent.

4. **Error Handling**  
   If an error occurs, you send a `500 Internal Server Error` response and close the connection.

5. **Testing**  
   You tested your implementation using `curl` with the `--next` flag to send multiple requests over the same connection, verifying that:
   - The connection remains open after the first request (unless `Connection: close` is sent).
   - Both requests receive correct, independent responses.

