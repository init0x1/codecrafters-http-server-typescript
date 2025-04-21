# Return a File

## Task Overview
In this stage, you need to implement the `/files/{filename}` endpoint that:
1. Accepts a filename parameter
2. Looks for the file in a specified directory
3. Returns the file contents if found, or a 404 error if not found

## Command Line Arguments
Your server must accept a `--directory` flag that specifies the absolute path to the directory where files are stored:
```
./your_program.sh --directory /path/to/files/
```

## HTTP Response Requirements
When a client sends a GET request to `/files/{filename}`, your server must:

### If the file exists:
- Return status code: `200 OK`
- Include headers:
  - `Content-Type: application/octet-stream`
  - `Content-Length: [size of file in bytes]`
- Set the response body to the file contents

### If the file doesn't exist:
- Return status code: `404 Not Found`

## Examples

### Example 1: File exists
**Request:**
```
GET /files/foo HTTP/1.1
```
(Where "foo" is a file containing "Hello, World!")

**Expected Response:**
```
HTTP/1.1 200 OK
Content-Type: application/octet-stream
Content-Length: 13

Hello, World!
```

### Example 2: File doesn't exist
**Request:**
```
GET /files/non_existent_file HTTP/1.1
```

**Expected Response:**
```
HTTP/1.1 404 Not Found
```

## Solution Workflow

Here's how I approached solving this task:

1. **Added file system handling**:
   - Imported the Node.js `fs` and `path` modules
   - Created a dedicated handler function for file requests

2. **Implemented command-line argument parsing**:
   - Added code to extract the directory path from the `--directory` flag
   - Used `process.argv` to access command-line arguments

3. **Created the file request handler**:
   - Extracted the filename from the request path
   - Constructed the full file path using `path.join()`
   - Used `fs.readFileSync()` to read the file contents
   - Set appropriate headers for the response

4. **Added error handling**:
   - Used try/catch to handle file not found errors
   - Returned a 404 response when the file doesn't exist

5. **Updated the router**:
   - Added a new route for paths starting with `/files/`
   - Connected it to the file request handler

The implementation successfully serves files from the specified directory and handles both existing and non-existent file requests appropriately.