'use strict'

// read config
import { H as Hyperdoc } from './init'
const Repository = Hyperdoc.Repository

// error handling
import { HandleHttpResponse } from './util'

// lambda wrapping
import { wrapAWSLambdaModule } from './wrapper'

/**
 * Get a node.
 *
 * @returns {Promise}
 */
function Get (event, context, callback) {
  const uuid = event.pathParameters.uuid

  return Repository.Node.find(context.hyperdoc.session, uuid).then(node => {
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
  const uuid = event.pathParameters.uuid
  const data = event.body

  // Find, or generate new, node
  const p = uuid ? Repository.Node.find(context.hyperdoc.session, uuid) : Promise.resolve(new Node())

  return p.then(node => {
    // node not found
    if (!node) {
      HandleHttpResponse.notFound(callback, 'Node ' + uuid + ' not found')
    } else {
      // set new data
      node.data = data

      // and save it
      return Repository.Node.save(context.hyperdoc.session, node).then(node => {
        HandleHttpResponse.ok(callback, node.toJSON())
      })
    }
  })
}

/**
 * Delete a node.
 */
function Delete (event, context, callback) {
  const uuid = event.pathParameters.uuid

  return Repository.Node.find(context.hyperdoc.session, uuid).then(node => {
    // node not found
    if (!node) {
      HandleHttpResponse.notFound(callback, 'Node ' + uuid + ' not found')
    } else {
      // delete node
      return Repository.Node.delete(context.hyperdoc.session, uuid).then(res => {
        HandleHttpResponse.ok(callback, {})
      })
    }
  })
}

export = wrapAWSLambdaModule({
  get: Get,
  post: Save,
  put: Save,
  delete: Delete
})
