'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
class HttpResponse {
    constructor(statusCode, body = {}) {
        this.statusCode = statusCode;
        this.body = body;
    }
    static ok(body = {}) {
        return new HttpResponse(200, body);
    }
    static badRequest(message, data = {}) {
        return new HttpResponse(400, { message, data });
    }
    static forbidden(message, data = {}) {
        return new HttpResponse(403, { message, data });
    }
    static notFound(message, data = {}) {
        return new HttpResponse(404, { message, data });
    }
    static internalError(message, data = {}) {
        return new HttpResponse(500, { message, data });
    }
    toJSON() {
        return {
            statusCode: this.statusCode,
            body: this.body
        };
    }
}
exports.HttpResponse = HttpResponse;
class HandleHttpResponse {
    static ok(callback, body = {}) {
        callback(null, HttpResponse.ok(body));
    }
    static badRequest(callback, message, data = {}) {
        callback(null, HttpResponse.badRequest(message, data));
    }
    static forbidden(callback, message, data = {}) {
        callback(null, HttpResponse.forbidden(message, data));
    }
    static notFound(callback, message, data = {}) {
        callback(null, HttpResponse.notFound(message, data));
    }
    static internalError(callback, message, data = {}) {
        callback(null, HttpResponse.internalError(message, data));
    }
}
exports.HandleHttpResponse = HandleHttpResponse;
