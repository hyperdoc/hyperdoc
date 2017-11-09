'use strict'

import HttpResponse from './HttpResponse'

export default class HandleHttpResponse {
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