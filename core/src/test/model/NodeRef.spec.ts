'use strict'

import { NodeHRN } from '../../model'

import * as uuid from 'uuid'
import { expect } from 'chai'

describe('Core :: Model :: NodeRef', function () {
    it('convert from and to NodeRef', function () {
        const hrn = NodeHRN.generate()
        const hrnStr = 'hyperdoc:node:' + hrn.uuid
        
        // converts to string?
        expect(hrnStr).to.equal(hrn.toString())

        // converts from string?
        const ref2 = NodeHRN.fromString(hrnStr)
        expect(ref2).to.exist
        expect(hrn.namespace).to.equal(ref2.namespace)
        expect(hrn.uuid).to.equal(ref2.uuid)
    })
})