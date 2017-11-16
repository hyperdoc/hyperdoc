'use strict'

// read config
import * as Hyperdoc from '../init'
const Repository = Hyperdoc.Repository

import { NodeType } from 'hyperdoc-core/dist/model'

// error handling
import { HandleHttpResponse } from '../util'

// lambda wrapping
import { wrapAWSLambdaFunction } from '../wrapper'

/**
 * Get a node.
 *
 * @returns {Promise}
 */
function Get (event, context, callback): Promise<any> {
  const uuid = event.pathParameters.uuid

  return Repository.nodeService.find(context.hyperdoc.session, uuid).then(node => {
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
function Save (event, context, callback): Promise<any> {
  const uuid = event.pathParameters.uuid
  const data = event.body

  // Find, or generate new, node
  const p = uuid ? Repository.nodeService.find(context.hyperdoc.session, uuid) : Promise.resolve(NodeType.builder().build())

  return p.then(node => {
    // node not found
    if (!node) {
      HandleHttpResponse.notFound(callback, 'Node ' + uuid + ' not found')
    } else {
      // and save it
      return Repository.nodeService.create(context.hyperdoc.session, data, {}).then(node => {
        HandleHttpResponse.ok(callback, node.toJSON())
      })
    }
  })
}

export = {
  get: wrapAWSLambdaFunction(Get),
  post: wrapAWSLambdaFunction(Save),
  put: wrapAWSLambdaFunction(Save)
}
