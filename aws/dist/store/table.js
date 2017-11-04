'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const AWS = require("aws-sdk");
const documentClient = new AWS.DynamoDB.DocumentClient();
const uuid = require("uuid");
class DynamoTable {
    constructor(params, mapper) {
        this.params = params;
        this.mapper = mapper;
    }
    delete(key) {
        return new Promise((resolve, reject) => {
            documentClient.delete({
                TableName: this.params.tableName,
                Key: key
            }, (err) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve({});
                }
            });
        });
    }
    get(key) {
        const self = this;
        return new Promise((resolve, reject) => {
            documentClient.get({
                TableName: this.params.tableName,
                Key: key
            }, (err, data) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(self.mapper && data.Item ? self.mapper(data.Item) : data.Item);
                }
            });
        });
    }
    put(data) {
        const self = this;
        data.uuid = data.uuid || uuid.v1();
        return new Promise((resolve, reject) => {
            documentClient.put({
                TableName: this.params.tableName,
                Item: data
            }, (err) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(self.mapper ? self.mapper(data) : data);
                }
            });
        });
    }
}
exports.DynamoTable = DynamoTable;
