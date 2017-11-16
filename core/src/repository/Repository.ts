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

  /**
   * Configure repository.
   * 
   * @param {HyperdocConfig} config - Configure repository
   * @param {StoreRegistry} storeRegistry - Store registry
   */
  configure (config: HyperdocConfig, storeRegistry: StoreRegistry): void {
    this.config = config || DEFAULT_CONFIG
    this.storeRegistry = storeRegistry

    this.nodeService = new NodeService(storeRegistry.nodeStore)
  }
}
