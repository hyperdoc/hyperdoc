'user strict';
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const hyperdoc_core_1 = require("hyperdoc-core");
const NodeStore = hyperdoc_core_1.Store.NodeStore;
const Node = hyperdoc_core_1.Model.Node;
const table_1 = require("./table");
class AWSNodeStore extends NodeStore {
    constructor(config) {
        super();
        const tableParams = config.tables.node;
        this.nodeTable = new table_1.DynamoTable(tableParams, Node.fromJSON);
    }
    get(uuid) {
        return this.nodeTable.get({ uuid: uuid });
    }
    delete(uuid) {
        return this.nodeTable.delete({ uuid: uuid });
    }
    put(node) {
        return this.nodeTable.put(node);
    }
}
exports.AWSNodeStore = AWSNodeStore;
