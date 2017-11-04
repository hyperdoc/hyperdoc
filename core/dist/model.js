'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
class Node {
    constructor(uuid, data, meta) {
        this.uuid = uuid;
        this.data = data || {};
        this.meta = meta || {};
    }
    toJSON() {
        return {
            uuid: this.uuid,
            data: this.data,
            meta: this.meta
        };
    }
    static fromJSON(json) {
        return new Node(json.uuid, json.data, json.meta);
    }
}
exports.Node = Node;
