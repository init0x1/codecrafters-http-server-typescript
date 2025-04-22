import * as fs from 'fs';
import * as path from 'path';
import zlib from "zlib";


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

export const notPersistentConnection = (request: ParsedHttpRequest): boolean => {
    const connectionHeader = request.headers['connection'];
    if(connectionHeader && connectionHeader.toLowerCase() === 'close'){
        return true
    }
    return false
}

export const handleDefaultRoute = (): string => {
    return "HTTP/1.1 200 OK\r\n\r\n";
}

export const handleCreatedResource = (): string => {
    return "HTTP/1.1 201 Created\r\n\r\n";
}

export const handleBadRequest = (): string => {
    return "HTTP/1.1 400 Bad Request\r\n\r\n";
}

// duplicate record
export const handleConflictError = (): string => {
    return "HTTP/1.1 409 Conflict\r\n\r\n";
}

export const handleMethodNotAllowed = (): string => {
    return "HTTP/1.1 405 Method Not Allowed\r\n\r\n";
}

export const handleServerError = (): string => {
    return "HTTP/1.1 500 Internal Server Error\r\n\r\n";
}


export const handleNotFoundRoute = (): string => {
    return "HTTP/1.1 404 Not Found\r\n\r\n";
}

export const handleEchoRequest = (request: ParsedHttpRequest): string => {
    if (request.httpMethod === "GET" && request.requestPath.startsWith("/echo/")) {
        const echoStr = request.requestPath.substring(6);
        return `HTTP/1.1 200 OK\r\nContent-Type: text/plain\r\nContent-Length: ${echoStr.length}\r\n\r\n${echoStr}`;
    }

    return handleDefaultRoute();
};

export const handleUserAgent = (request: ParsedHttpRequest): string => {
    const userAgent = request.headers['user-agent'] || 'Unknown';
    return `HTTP/1.1 200 OK\r\nContent-Type: text/plain\r\nContent-Length: ${userAgent.length}\r\n\r\n${userAgent}`;
};


export const handleGetFileRequest = (request: ParsedHttpRequest, baseDir: string): string => {
    const fileName = request.requestPath.replace("/files/", "");
    const filePath = path.join(baseDir, fileName)
    try {
        const fileContent = fs.readFileSync(filePath);
        return `HTTP/1.1 200 OK\r\nContent-Type: application/octet-stream\r\nContent-Length: ${fileContent.length}\r\n\r\n${fileContent}`;
    } catch {
        return handleNotFoundRoute();
    }
}

export const handlePostFileRequest = (request: ParsedHttpRequest, baseDir: string): string => {
    const fileName = request.requestPath.replace("/files/", "");
    const filePath = path.join(baseDir, fileName)
    const fileContent = request.body as string;

    if (!fs.existsSync(filePath)) {
        try {
            fs.writeFileSync(filePath, fileContent)
            return handleCreatedResource()
        } catch (error) {
            return handleServerError()
        }
    }
    return handleConflictError();
}

export const checkAcceptEncodingHeader = (request: ParsedHttpRequest): boolean => {

    if (!request.headers["accept-encoding"]) {
        return false;
    }

    const acceptEncodingHeaders = request.headers["accept-encoding"]
        .toLowerCase()
        .split(',')
        .map(encoding => encoding.trim());
    console.log(acceptEncodingHeaders);
    return acceptEncodingHeaders.includes("gzip");
};


export const handleEncodedContent = (request: ParsedHttpRequest): Buffer => {
    const contentStr = request.requestPath.substring(6);
    const gzippedContent = zlib.gzipSync(contentStr);

    const headers = [
        'HTTP/1.1 200 OK',
        'Content-Type: text/plain',
        'Content-Encoding: gzip',
        `Content-Length: ${gzippedContent.length}`,
        '\r\n'
    ].join('\r\n');


    return Buffer.concat([
        Buffer.from(headers),
        gzippedContent
    ]);
};

