## Tasks
### 1.  Response with 200 ok
In this stage, your server will respond to an HTTP request with a `200` response.

### HTTP response

An HTTP response is made up of three parts, each separated by a [CRLF](https://developer.mozilla.org/en-US/docs/Glossary/CRLF) (`\r\n`):

1.  Status line.
2.  Zero or more headers, each ending with a CRLF.
3.  Optional response body.

In this stage, your server's response will only contain a status line. Here's the response your server must send:

```sh
HTTP/1.1 200 OK\r\n\r\n
```

Here's a breakdown of the response:

```
// Status line HTTP/1.1 // HTTP version 200 // Status code OK // Optional reason phrase \r\n // CRLF that marks the end of the status line // Headers (empty) \r\n // CRLF that marks the end of the headers // Response body (empty)
```

For more information about HTTP responses, see the [MDN Web Docs on HTTP responses](https://developer.mozilla.org/en-US/docs/Web/HTTP/Messages#http_responses) or the [HTTP/1.1 specification](https://datatracker.ietf.org/doc/html/rfc9112#name-message).

### Tests

The tester will execute your program like this:

```bash
$ ./your_program.sh
```

The tester will then send an HTTP `GET` request to your server:

```bash
$ curl -v http://localhost:4221
```

Your server must respond to the request with the following response:

```javascript
HTTP/1.1 200 OK\r\n\r\n
```
