'use strict'

let HandleHttpResponse = require('./util').HandleHttpResponse

/**
 * Wrap an AWS Lambda function to handle general errors, execute interceptors, etc.
 * 
 * @param {Function} func - AWS Lambda function
 */
function wrapAWSLambdaFunction (func) {
  return (event, context, callback) => {
    try {
      // TODO apply PRE lambda interceptors

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
 * @param {Object} module - AWS Lambda module
 */
function wrapAWSLambdaModule (module) {
  let wrappedModule = {}
  for (let key in module) {
    wrappedModule[key] = wrapAWSLambdaFunction(module[key])
  }
  return wrappedModule
}

module.exports = {wrapAWSLambdaModule, wrapAWSLambdaFunction}
