'user strict'

import * as Hyperdoc from 'hyperdoc-core'
const StoreRegistry = Hyperdoc.Store.StoreRegistry

import { AWSNodeStore } from './node'

/**
 * Initialise an AWS based store registry.
 *
 * @param {Object} config - Configuration
 */
export function initStoreRegistry (config) {
  // init stores
  const nodeStore = new AWSNodeStore(config)

  return new StoreRegistry(nodeStore)
}
