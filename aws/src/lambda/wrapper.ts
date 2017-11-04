'use strict'

import { HandleHttpResponse } from './util'

/**
 * Wrap an AWS Lambda function to handle general errors, execute interceptors, etc.
 *
 * @param {Function} func - AWS Lambda function
 */
export function wrapAWSLambdaFunction (func: Function) {
  return (event, context, callback) => {
    try {
      // TODO apply PRE lambda interceptors
      context.hyperdoc = context.hyperdoc || {}

      // invoke function
      var res = func(event, context, callback)

      // check function respond with a Promise
      if (!(res instanceof Promise)) {
        HandleHttpResponse.internalError(callback, 'API Lambda function must respond with a Promise')
      }

      // TODO apply POST lambda interceptors

      // catch unhandled exceptions
      res.catch(err => {
        console.log(err)
        HandleHttpResponse.internalError(callback, err.message)
      })
    } catch (e) {
      console.error('Uncaught exception', e, e.stack)
      HandleHttpResponse.internalError(callback, 'An internal error occurred')
    }
  }
}

/**
 * Wrap an object containing AWS Lambda functions.
 *
 * @param {{}} module - AWS Lambda module
 */
export function wrapAWSLambdaModule (module: {}) {
  const wrappedModule = {}
  for (const key in module) {
    wrappedModule[key] = wrapAWSLambdaFunction(module[key])
  }
  return wrappedModule
}