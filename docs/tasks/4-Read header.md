# Read Request Headers

## Task Overview
In this stage, you need to implement the `/user-agent` endpoint that:
1. Reads the `User-Agent` header from the HTTP request
2. Returns the header value in the response body
3. Includes proper HTTP headers in the response

## HTTP Response Requirements
When a client sends a GET request to `/user-agent`, your server must respond with:
- Status code: `200 OK`
- Headers:
  - `Content-Type: text/plain`
  - `Content-Length: [length of User-Agent value]`
- Body: The value of the `User-Agent` header

## Example
**Request:**
```
GET /user-agent HTTP/1.1
Host: localhost:4221
User-Agent: foobar/1.2.3
Accept: */*
```

**Expected Response:**
```
HTTP/1.1 200 OK
Content-Type: text/plain
Content-Length: 12

foobar/1.2.3
```

## Solution Workflow

Here's how I approached solving this task:

1. **Enhanced HTTP request parsing**:
   - Modified the parser to extract headers from the request
   - Implemented case-insensitive header name handling
   - Created a structured `ParsedHttpRequest` interface

2. **Created a dedicated handler for the user-agent endpoint**:
   - Added a `handleUserAgent` function that extracts the User-Agent header
   - Set appropriate Content-Type and Content-Length headers
   - Returned the User-Agent value as the response body

3. **Updated the router**:
   - Added a new route for `/user-agent` path
   - Connected it to the `handleUserAgent` function

4. **Improved error handling**:
   - Added try/catch blocks to handle parsing errors
   - Implemented proper error responses

The implementation successfully extracts the User-Agent header from incoming requests and returns it in the response body with the appropriate headers.