import type { ParsedHttpRequest } from "./handlers";
import {
    handleBadRequest,
    handleDefaultRoute,
    checkAcceptEncodingHeader,
    handleConflictError,
    handleCreatedResource,
    handleEchoRequest,
    handleEncodedContent,
    handleGetFileRequest,
    handleMethodNotAllowed,
    handleNotFoundRoute,
    handlePostFileRequest,
    handleServerError,
    handleUserAgent,
    parseHttpRequest,
} from "./handlers";


const dirFlagIndex = process.argv.indexOf("--directory");
const baseDir = dirFlagIndex !== -1 ? process.argv[dirFlagIndex + 1] : "";

export const router = (request: ParsedHttpRequest): string | Buffer => {
    const { requestPath, httpMethod } = request;


    if (requestPath === "/") {
        if (httpMethod === "GET") {
            return handleDefaultRoute();
        }
        return handleMethodNotAllowed();
    }

    if (requestPath.startsWith("/echo/")) {
        if (httpMethod === "GET") {
            const encodedContent = checkAcceptEncodingHeader(request); 
            return encodedContent ? handleEncodedContent(request) : handleEchoRequest(request);
        }
        return handleMethodNotAllowed();
    }


    if (requestPath === "/user-agent") {
        if (httpMethod === "GET") {
            return handleUserAgent(request);
        }
        return handleMethodNotAllowed();
    }

    if (requestPath.startsWith("/files/")) {
        if (!baseDir) {
            return handleServerError();
        }

        if (httpMethod === "GET") {
            return handleGetFileRequest(request, baseDir);
        }

        if (httpMethod === "POST") {
            return handlePostFileRequest(request, baseDir);
        }

        return handleMethodNotAllowed();
    }

    return handleNotFoundRoute();
};
