'use strict'

import { HyperdocConfig } from './config'
import { NodeService } from './services/node'
import { StoreRegistry } from './store'

const DEFAULT_CONFIG: HyperdocConfig = {}

/**
 * Hyperdoc repository.
 */
export class Repository {
  public config: HyperdocConfig
  public storeRegistry: StoreRegistry
  public nodeService: NodeService

  configure (config: HyperdocConfig, storeRegistry: StoreRegistry) {
    this.config = config || DEFAULT_CONFIG
    this.storeRegistry = storeRegistry

    this.nodeService = new NodeService(storeRegistry.nodeStore)
  }
}
