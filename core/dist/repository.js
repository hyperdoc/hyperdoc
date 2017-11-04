'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const node_1 = require("./services/node");
const DEFAULT_CONFIG = {};
class Repository {
    configure(config, storeRegistry) {
        this.config = config || DEFAULT_CONFIG;
        this.storeRegistry = storeRegistry;
        this.Node = new node_1.NodeService(this.storeRegistry.nodeStore);
    }
}
exports.Repository = Repository;
