'use strict'

import HyperdocConfig from './HyperdocConfig'
import { StoreRegistry } from '../store'
import { NodeService } from '../service'

const DEFAULT_CONFIG: HyperdocConfig = {}

/**
 * Hyperdoc repository.
 */
export default class Repository {
  public config: HyperdocConfig
  public storeRegistry: StoreRegistry
  public nodeService: NodeService

  configure (config: HyperdocConfig, storeRegistry: StoreRegistry) {
    this.config = config || DEFAULT_CONFIG
    this.storeRegistry = storeRegistry

    this.nodeService = new NodeService(storeRegistry.nodeStore)
  }
}
