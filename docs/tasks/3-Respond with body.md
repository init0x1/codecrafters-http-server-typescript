# Respond with Body

## Task Overview
In this stage, you need to implement the `/echo/{str}` endpoint that:
1. Accepts a string in the URL path
2. Returns that string in the response body
3. Includes proper HTTP headers for the response body

## HTTP Response Requirements
When a client sends a GET request to `/echo/{str}`, your server must respond with:
- Status code: `200 OK`
- Headers:
  - `Content-Type: text/plain`
  - `Content-Length: [length of string]`
- Body: The string from the URL path

## Example
**Request:**
```
GET /echo/abc HTTP/1.1
```

**Expected Response:**
```
HTTP/1.1 200 OK
Content-Type: text/plain
Content-Length: 3

abc
```

## Solution Workflow

Here's how I approached solving this task:

1. **Parse the HTTP request**:
   - Split the request by CRLF (`\r\n`) to get the request line
   - Extract the method and path from the request line

2. **Route the request based on path**:
   - If the path is `/`, return a simple 200 OK response
   - If the path starts with `/echo/`, extract the string after `/echo/`
   - For any other path, return a 404 Not Found response

3. **Create the appropriate response for echo requests**:
   - For `/echo/{str}` requests, include the required headers:
     - `Content-Type: text/plain`
     - `Content-Length: [length of string]`
   - Add the extracted string as the response body

4. **Send the response to the client**:
   - Convert the response string to a Buffer
   - Write the Buffer to the socket
   - Close the connection

This implementation successfully handles the `/echo/{str}` endpoint while maintaining support for the root path and returning appropriate error responses for invalid paths.