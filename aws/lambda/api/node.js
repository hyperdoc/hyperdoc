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
let wrapAWSLambdaModule = require('./wrapper').wrapAWSLambdaModule

/**
 * Get a node.
 */
function Get (event, context, callback) {
  let uuid = event.pathParameters.uuid

  return Repository.Node.find(uuid).then(node => {
    if (node) {
      HandleHttpResponse.ok(callback, node.toJSON())
    } else {
      HandleHttpResponse.notFound(callback, 'Node ' + uuid + ' not found')
    }
  })
}

/**
 * Create or update a node.
 */
function Save (event, context, callback) {
  let uuid = event.pathParameters.uuid
  let data = event.body

  // Find, or create new, node
  var p = uuid ? Repository.Node.find(uuid) : Promise.resolve(new Node())

  return p.then(node => {
    // node not found
    if (!node) {
      HandleHttpResponse.notFound(callback, 'Node ' + uuid + ' not found')
    } else {
      // set data
      node.data = data

      // and save it
      return Repository.Node.save(uuid, data).then(node => {
        HandleHttpResponse.ok(callback, node.toJSON())
      })
    }
  })
}

/**
 * Delete a node.
 */
function Delete (event, context, callback) {
  let uuid = event.pathParameters.uuid

  return Repository.Node.find(uuid).then(node => {
    // node not found
    if (!node) {
      HandleHttpResponse.notFound(callback, 'Node ' + uuid + ' not found')
    } else {
      // delete node
      return Repository.Node.delete(uuid).then(res => {
        HandleHttpResponse.ok(callback, {})
      })
    }
  })
}

module.exports = wrapAWSLambdaModule({
  get: Get,
  post: Save,
  put: Save,
  delete: Delete
})
