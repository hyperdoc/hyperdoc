'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
class StoreRegistry {
    constructor(nodeStore) {
        this.nodeStore = nodeStore;
    }
}
exports.StoreRegistry = StoreRegistry;
class NodeStore {
    delete(uuid) {
        throw new Error("Node store must be an instance of 'NodeStore'");
    }
    get(uuid) {
        throw new Error("Node store must be an instance of 'NodeStore'");
    }
    put(node) {
        throw new Error("Node store must be an instance of 'NodeStore'");
    }
}
exports.NodeStore = NodeStore;
