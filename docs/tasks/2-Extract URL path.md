# Extract URL Path from HTTP Request

## Task Overview
In this stage, you need to build a server that can:
1. Extract the URL path from an HTTP request
2. Respond with a `200 OK` status code if the path is `/`
3. Respond with a `404 Not Found` status code for any other path

## HTTP Request Structure
An HTTP request consists of three parts separated by CRLF (`\r\n`):
1. Request line (e.g., `GET /index.html HTTP/1.1`)
2. Headers (e.g., `Host: localhost:4221`)
3. Optional request body

Example HTTP request:
```
GET /index.html HTTP/1.1\r\n
Host: localhost:4221\r\n
User-Agent: curl/7.64.1\r\n
Accept: */*\r\n
\r\n
```

## Testing Criteria
The tester will:
1. Send a GET request to a random path (e.g., `/abcdefg`)
   - Your server must respond with: `HTTP/1.1 404 Not Found\r\n\r\n`

2. Send a GET request to the root path (`/`)
   - Your server must respond with: `HTTP/1.1 200 OK\r\n\r\n`

## Solution Workflow

Here's how I approached solving this task:

1. **Parse the HTTP request**:
   - Split the request string by CRLF (`\r\n`)
   - Extract the first line (request line)
   - Split the request line by spaces to get the method, path, and HTTP version

2. **Extract the URL path**:
   - The path is the second element in the request line (index 1)

3. **Create the appropriate response**:
   - If the method is "GET" and the path is "/", return a 200 OK response
   - Otherwise, return a 404 Not Found response

4. **Send the response back to the client**:
   - Write the response to the socket

This approach allows the server to correctly handle different paths and respond with the appropriate status codes as required by the task.