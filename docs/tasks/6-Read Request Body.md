# Read Request Body

## Task Overview
In this stage, you need to implement the `POST` method for the `/files/{filename}` endpoint that:
1. Accepts data from the client in the request body
2. Creates a new file with the provided content
3. Returns an appropriate status code

## HTTP Request Details
The client will send a POST request with:
- A path parameter specifying the filename
- A request body containing the file content
- Headers including `Content-Type` and `Content-Length`

## HTTP Response Requirements
When a client sends a POST request to `/files/{filename}`, your server must:
1. Create a new file with the specified name in the directory provided by the `--directory` flag
2. Write the request body content to the file
3. Return a `201 Created` status code

## Example
**Request:**
```
POST /files/number HTTP/1.1
Host: localhost:4221
User-Agent: curl/7.64.1
Accept: */*
Content-Type: application/octet-stream
Content-Length: 5

12345
```

**Expected Response:**
```
HTTP/1.1 201 Created
```

## Solution Workflow

Here's how I approached solving this task:

1. **Enhanced request parsing**:
   - Made sure the parser correctly extracts the request body from HTTP requests
   - Properly handled the separation between headers and body with `\r\n\r\n`

2. **Created a dedicated POST handler**:
   - Implemented `handlePostFileRequest` function to process POST requests
   - Extracted the filename from the request path using string manipulation
   - Used Node.js file system operations to write the file

3. **Added file writing functionality**:
   - Used `fs.writeFileSync()` to create and write to files
   - Added checks to prevent overwriting existing files with `fs.existsSync()`
   - Implemented proper error handling for file operations

4. **Updated the router logic**:
   - Enhanced the router to handle different HTTP methods for the same path
   - Added method-specific routing for GET and POST requests to `/files/`
   - Implemented a method not allowed response for unsupported methods

5. **Added new response types**:
   - Created `handleCreatedResource()` for 201 Created responses
   - Added `handleConflictError()` for when files already exist
   - Implemented `handleMethodNotAllowed()` for unsupported HTTP methods

The implementation successfully handles POST requests to create new files with the content provided in the request body, while maintaining all previously implemented functionality.