'user strict'

import { StoreRegistry } from 'hyperdoc-core/dist/store'

import { AWSNodeStore } from './node'

/**
 * Initialise an AWS based store registry.
 *
 * @param {Object} config - Configuration
 */
export function initStoreRegistry (config): StoreRegistry {
  // init stores
  const nodeStore = new AWSNodeStore(config)

  return new StoreRegistry(nodeStore)
}
