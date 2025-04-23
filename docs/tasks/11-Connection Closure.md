


          
# Connection Closure Implementation Task

## Task Overview
In this stage, you need to implement support for explicit connection closure using the `Connection: close` HTTP header.

## Requirements
Your HTTP server must:
1. Keep connections open by default (for regular requests)
2. Close connections when a request includes the `Connection: close` header
3. Include the `Connection: close` header in the response when closing the connection

## Test Scenario
The tester will execute your program and send two sequential requests:
1. A regular request that should keep the connection open
2. A request with `Connection: close` header that should close the connection

Example test command:
```bash
curl --http1.1 -v http://localhost:4221/echo/orange --next http://localhost:4221/ -H "Connection: close"
```

## Solotion Workflow

To implement this feature, you'll need to:

1. **Parse the Request Headers**
   - Modify your request parsing logic to identify the `Connection: close` header
   - Store this information in your request object

2. **Update Response Generation**
   - When a request contains `Connection: close`, include the same header in the response
   - Example response header: `Connection: close`

3. **Handle Connection Management**
   - For regular requests: continue listening for more requests on the same socket
   - For requests with `Connection: close`: close the socket after sending the response

4. **Test Your Implementation**
   - Verify that your server keeps connections open by default
   - Verify that it properly closes connections when requested
   - Confirm the `Connection: close` header is included in responses when needed


        