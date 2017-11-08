'user strict'

import { AwsConfig } from '../config'
import { StoreRegistry } from 'hyperdoc-core/dist/store'

import { AWSNodeStore } from './node'

/**
 * Initialise an AWS based store registry.
 *
 * @param {AwsConfig} config - AWS Configuration
 */
export function initStoreRegistry (config: AwsConfig): StoreRegistry {
  // init stores
  const nodeStore = new AWSNodeStore(config)

  return new StoreRegistry(nodeStore)
}
