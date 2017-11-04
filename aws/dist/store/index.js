'user strict';
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Hyperdoc = require("hyperdoc-core");
const StoreRegistry = Hyperdoc.Store.StoreRegistry;
const node_1 = require("./node");
function initStoreRegistry(config) {
    const nodeStore = new node_1.AWSNodeStore(config);
    return new StoreRegistry(nodeStore);
}
exports.initStoreRegistry = initStoreRegistry;
