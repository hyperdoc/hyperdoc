'use strict'

import { NodeService } from './services/node'
import { StoreRegistry } from './store'

const DEFAULT_CONFIG = {}

/**
 * Hyperdoc repository.
 */
export class Repository {
  public config: any
  public storeRegistry: StoreRegistry
  public nodeService: NodeService

  configure (config: any, storeRegistry: StoreRegistry) {
    this.config = config || DEFAULT_CONFIG
    this.storeRegistry = storeRegistry

    this.nodeService = new NodeService(storeRegistry.nodeStore)
  }
}
