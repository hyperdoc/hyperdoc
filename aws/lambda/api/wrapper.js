'use strict'

let HandleHttpResponse = require('./util').HandleHttpResponse

function wrapFunction (func) {
  return (event, context, callback) => {
    try {
      // TODO apply pre lambda interceptors (e.g. authorisation, etc.)
      func(event, context, callback)
    } catch (e) {
      console.error('Uncaught exception', e, e.stack)
      HandleHttpResponse.internalError(callback, 'An internal error occurred')
    }
  }
}

function wrapModule (mod) {
  let out = {}
  for (let key in mod) {
    out[key] = wrapFunction(mod[key])
  }
  return out
}

module.exports = {wrapModule, wrapFunction}
