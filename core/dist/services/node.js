'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const model_1 = require("../model");
class NodeService {
    constructor(nodeStore) {
        this.nodeStore = nodeStore;
    }
    find(session, uuid) {
        return this.nodeStore.get(uuid).then(node => {
            return Promise.resolve(node);
        });
    }
    create(session, data, meta) {
        meta.createTime = new Date().toISOString();
        meta.updateTime = meta.createTime;
        return this.nodeStore.put(new model_1.Node(undefined, data, meta));
    }
}
exports.NodeService = NodeService;
