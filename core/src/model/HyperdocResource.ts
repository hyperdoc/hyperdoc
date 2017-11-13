'use strict'

import HRN from './HRN'

export default interface HyperdocResource<T extends HRN> {
    readonly hrn: T
}