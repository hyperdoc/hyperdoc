'user strict'

import { AwsConfig } from '../config'
import { StoreRegistry } from 'hyperdoc-core/dist/store'

import AWSNodeStore from './AWSNodeStore'

/**
 * Initialise an AWS based store registry.
 *
 * @param {AwsConfig} config - AWS Configuration
 * @returns {StoreRegistry} Store registry
 */
export function initStoreRegistry (config: AwsConfig): StoreRegistry {
  // init stores
  const nodeStore = new AWSNodeStore(config)

  return new StoreRegistry(nodeStore)
}

export { AWSNodeStore }