'use strict'

// read config
import { Config } from '../config'

// initiate store registry
import { initStoreRegistry } from '../store'
const storeRegistry = initStoreRegistry(Config.aws)

// initiate Hyperdoc
import * as Hyperdoc from 'hyperdoc-core'
Hyperdoc.Repository.configure(Config.hyperdoc, storeRegistry)

export = Hyperdoc