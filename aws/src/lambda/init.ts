'use strict'

// read config
import * as config from '../config'

// initiate store registry
import { initStoreRegistry } from '../store'
const storeRegistry = initStoreRegistry(config.aws)

// initiate Hyperdoc
import * as Hyperdoc from 'hyperdoc-core'
Hyperdoc.Repository.configure(config, storeRegistry)

export = Hyperdoc