# HTTP Compression Headers

## Task Overview
In this stage, you need to implement support for HTTP compression headers:
1. Recognize when a client supports compression via the `Accept-Encoding` header
2. Respond with appropriate `Content-Encoding` headers
3. Handle cases where compression is not supported

## HTTP Headers Explained
- **Accept-Encoding**: Sent by the client to indicate which compression schemes it supports
- **Content-Encoding**: Sent by the server to indicate which compression scheme was used for the response

## Requirements
For this stage:
1. Only support the `gzip` compression scheme
2. No need to actually compress the response body yet (that comes in a later stage)
3. Only add the `Content-Encoding` header when the client supports a compression scheme you support

## Test Cases

### Test Case 1: Client Supports gzip
**Request:**
```
GET /echo/abc HTTP/1.1
Host: localhost:4221
Accept-Encoding: gzip
```

**Expected Response:**
```
HTTP/1.1 200 OK
Content-Type: text/plain
Content-Encoding: gzip

[response body]
```

### Test Case 2: Client Doesn't Support gzip
**Request:**
```
GET /echo/abc HTTP/1.1
Host: localhost:4221
Accept-Encoding: invalid-encoding
```

**Expected Response:**
```
HTTP/1.1 200 OK
Content-Type: text/plain

[response body]
```

## Solution Workflow

Here's how I approached solving this task:

1. **Added header checking functionality**:
   - Created a `checkAcceptEncodingHeader` function to examine the request headers
   - Implemented logic to check if the client supports gzip compression
   - Added null checks to handle cases where the header might not exist

2. **Updated the router logic**:
   - Modified the `/echo/` route to check for compression support
   - Added conditional logic to choose between compressed and uncompressed responses
   - Ensured backward compatibility with existing functionality

3. **Created a new response handler**:
   - Implemented `handleEncodedContent` function to generate responses with compression headers
   - Added the `Content-Encoding: gzip` header to responses when appropriate
   - Maintained the same content type and other required headers

4. **Fixed a critical bug**:
   - Corrected a typo in the variable name (`requst` → `request`) in the `handleEncodedContent` function
   - Added proper null checking to prevent errors when headers don't exist
   - Ensured the server responds with 500 errors instead of crashing

The implementation successfully handles compression headers while maintaining all previously implemented functionality.