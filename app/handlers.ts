export interface ParsedHttpRequest {
    httpMethod: string;
    requestPath: string;
    httpVersion: string;
    headers: Record<string, string>;
    body: string;
}

export const parseHttpRequest = (data: Buffer): ParsedHttpRequest => {
    const requestString = data.toString();
    const [headersSection, body = ""] = requestString.split("\r\n\r\n");
    const headersLines = headersSection.split("\r\n");


    const requestLine = headersLines[0];
    const [httpMethod, requestPath, httpVersion] = requestLine.split(" ");

    const headers: Record<string, string> = {};
    for (let i = 1; i < headersLines.length; i++) {
        const line = headersLines[i];
        if (line) {
            const [key, value] = line.split(": ");
            headers[key.toLowerCase()] = value;
        }
    }

    return {
        httpMethod,
        requestPath,
        httpVersion,
        headers,
        body
    };
};

const handleDefaultRoute = (): string => {
    return "HTTP/1.1 200 OK\r\n\r\n";
}

const handleNotFoundRoute = (): string => {
    return "HTTP/1.1 404 NotFound\r\n\r\n";
}

const handleEchoRequest = (request: ParsedHttpRequest): string => {
    if (request.httpMethod === "GET" && request.requestPath.startsWith("/echo/")) {
        const echoStr = request.requestPath.substring(6);
        return `HTTP/1.1 200 OK\r\nContent-Type: text/plain\r\nContent-Length: ${echoStr.length}\r\n\r\n${echoStr}`;
    }

    return handleDefaultRoute();
};

const handleUserAgent = (request: ParsedHttpRequest): string => {
    const userAgent = request.headers['user-agent'] || 'Unknown';

    return `HTTP/1.1 200 OK\r\nContent-Type: text/plain\r\nContent-Length: ${userAgent.length}\r\n\r\n${userAgent}`;
};


export const router = (request: ParsedHttpRequest): string => {
    const { requestPath } = request;

    if (requestPath === "/" && request.httpMethod === "GET") {
        return handleDefaultRoute();
    }

    if (requestPath.startsWith("/echo/")) {
        return handleEchoRequest(request);
    }
    if (requestPath === "/user-agent" && request.httpMethod === "GET") {
        return handleUserAgent(request);
    }

    return handleNotFoundRoute();
};