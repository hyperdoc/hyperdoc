'use strict'

import { Repository, HyperdocConfig } from './repository'

const repo = new Repository()
const config = <HyperdocConfig> {}

export {
  repo as Repository,
  config as HyperdocConfig
}
