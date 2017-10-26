'use strict'

// read config
let config = require('../../config')

// initiate store registry
let storeRegistry = require('../../store')(config.aws)

// initiate Hyperdoc
let H = require('../../core')(config.hyperdoc, storeRegistry)
let Repository = H.Repository

// error handling
let lambdaUtil = require('./util')
let HandleHttpResponse = lambdaUtil.HandleHttpResponse

// lambda wrapping
let wrapModule = require('./wrapper').wrapModule

/**
 * Get a node.
 */
function Get (event, context, callback) {
  let uuid = event.pathParameters.uuid

  Repository.Node.find(uuid).then(node => {
    if (node) {
      HandleHttpResponse.ok(callback, node.toJSON())
    } else {
      HandleHttpResponse.notFound(callback, 'Node ' + uuid + ' not found')
    }
  }).catch(err => {
    console.log(err)
    HandleHttpResponse.internalError(callback, err.message)
  })
}

/**
 * Save a node.
 */
function Save (event, context, callback) {
  let uuid = event.pathParameters.uuid
  let body = event.body

  if (!body.uuid) {
    body.uuid = uuid
  }

  Repository.Node.put(body).then(node => {
    HandleHttpResponse.ok(callback, node.toJSON())
  }).catch(err => {
    console.log(err)
    HandleHttpResponse.internalError(callback, err.message)
  })
}

/**
 * Delete a node.
 */
function Delete (event, context, callback) {
  let uuid = event.pathParameters.uuid

  Repository.Node.delete(uuid).then(res => {
    HandleHttpResponse.ok(callback, {})
  }).catch(err => {
    console.log(err)
    HandleHttpResponse.internalError(callback, err.message)
  })
}

module.exports = wrapModule({
  get: Get,
  post: Save,
  put: Save,
  delete: Delete
})
