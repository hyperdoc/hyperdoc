'use strict'

/**
 * Represents a HTTP response to the AWS API Gateway.
 */
export class HttpResponse {
  public statusCode: number
  public body: {}

  /**
   * Constructor.
   *
   * @param {number} statusCode - HTTP status code
   * @param {Object} body - Response body (if any)
   */
  constructor (statusCode: number, body: {} = {}) {
    this.statusCode = statusCode
    this.body = body
  }

  /**
   * Builds a 200 HttpResponse object.
   */
  static ok (body: {} = {}) {
    return new HttpResponse(200, body)
  }

  /**
   * Builds a 400 (BadRequest) HttpResponse object.
   */
  static badRequest (message: string, data: {} = {}) {
    return new HttpResponse(400, {message, data})
  }

  /**
   * Builds a 403 (Forbidden) HttpResponse object.
   */
  static forbidden (message: string, data: {} = {}) {
    return new HttpResponse(403, {message, data})
  }

  /**
   * Builds a 404 (NotFound) HttpResponse object.
   */
  static notFound (message: string, data: {} = {}) {
    return new HttpResponse(404, {message, data})
  }

  /**
   * Builds a 500 (InternalError) HttpResponse object.
   */
  static internalError (message: string, data: {} = {}) {
    return new HttpResponse(500, {message, data})
  }

  /**
   * Convert to JSON.
   */
  toJSON () {
    return {
      statusCode: this.statusCode,
      body: this.body
    }
  }
}

export class HandleHttpResponse {
  /**
   * Builds a 200 HttpResponse object.
   */
  static ok (callback: Function, body: {} = {}) {
    callback(null, HttpResponse.ok(body))
  }

  /**
   * Builds a 400 (BadRequest) HttpResponse object.
   */
  static badRequest (callback: Function, message: string, data: {} = {}) {
    callback(null, HttpResponse.badRequest(message, data))
  }

  /**
   * Builds a 403 (Forbidden) HttpResponse object.
   */
  static forbidden (callback: Function, message: string, data: {} = {}) {
    callback(null, HttpResponse.forbidden(message, data))
  }

  /**
   * Builds a 404 (NotFound) HttpResponse object.
   */
  static notFound (callback: Function, message: string, data: {} = {}) {
    callback(null, HttpResponse.notFound(message, data))
  }

  /**
   * Builds a 500 (InternalError) HttpResponse object.
   */
  static internalError (callback: Function, message: string, data: {} = {}) {
    callback(null, HttpResponse.internalError(message, data))
  }
}