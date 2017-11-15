'use strict'

import HRN from './HRN'

/**
 * Defines the basic structure of an Hyperdoc resource.
 */
export default interface HyperdocResource<T extends HRN> {
    hrn: T
}