'use strict'

import * as Model from './model'
import { Repository } from './repository'
import * as Store from './store'

export = {
  Model: Model,
  Repository: new Repository(),
  Store: Store,
  Config: {}
}
