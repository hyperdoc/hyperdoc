'use strict'

import { NodeHRN } from '../../model'

import * as UUID from 'uuid'
import { expect } from 'chai'

describe('Core :: Model :: NodeHRN', function () {
    it('convert from and to NodeHRN', function () {
        const uuid = UUID.v4()
        const hrn = new NodeHRN(uuid)
        const hrnStr = 'hyperdoc:node:' + uuid
        
        // converts to string?
        expect(hrnStr).to.equal(hrn.toString())

        // converts from string?
        const hrn2 = NodeHRN.fromString(hrnStr)
        expect(hrn2).to.exist
        expect(hrn.namespace).to.equal(hrn2.namespace)
        expect(hrn.id).to.equal(hrn2.id)
    })
})