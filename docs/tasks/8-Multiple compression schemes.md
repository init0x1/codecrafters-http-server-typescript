# Multiple Compression Schemes

## Task Overview
In this stage, you need to enhance your server to handle multiple compression schemes in the `Accept-Encoding` header:
1. Parse comma-separated lists of compression schemes
2. Check if any of the client's supported schemes match your server's capabilities
3. Respond appropriately based on compression support

## HTTP Headers Explained
- **Accept-Encoding**: Can contain multiple compression schemes separated by commas
- **Content-Encoding**: Should be included only when using a supported compression scheme

## Requirements
For this stage:
1. Your server only supports the `gzip` compression scheme
2. You need to check if `gzip` is included in the list of encodings
3. No need to actually compress the response body yet

## Test Cases

### Test Case 1: Client Supports gzip Among Others
**Request:**
```
GET /echo/abc HTTP/1.1
Host: localhost:4221
Accept-Encoding: invalid-encoding-1, gzip, invalid-encoding-2
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
Accept-Encoding: invalid-encoding-1, invalid-encoding-2
```

**Expected Response:**
```
HTTP/1.1 200 OK
Content-Type: text/plain

[response body]
```

## Solution 

Here's how I approached solving this task:

 **Updated the header checking function**:
   - Modified `checkAcceptEncodingHeader` to handle comma-separated values
   - Split the `Accept-Encoding` header value by commas
   - Trimmed whitespace from each encoding scheme
   - Checked if `gzip` is included in the list of supported encodings
