'use strict'

import { HandleHttpResponse } from './util'

export type AWSLambdaFunction = (event, context, callback) => void
export type HyperdocLambdaFunction = (event, context, callback) => Promise<any>

/**
 * Wrap an AWS Lambda function to handle general errors, execute interceptors, etc.
 *
 * @param {Function} func - AWS Lambda function
 */
export function wrapAWSLambdaFunction (func: HyperdocLambdaFunction): AWSLambdaFunction {
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
