'use strict';
const init_1 = require("./init");
const Repository = init_1.H.Repository;
const util_1 = require("./util");
const wrapper_1 = require("./wrapper");
function Get(event, context, callback) {
    const uuid = event.pathParameters.uuid;
    return Repository.Node.find(context.hyperdoc.session, uuid).then(node => {
        if (node) {
            util_1.HandleHttpResponse.ok(callback, node.toJSON());
        }
        else {
            util_1.HandleHttpResponse.notFound(callback, 'Node ' + uuid + ' not found');
        }
    });
}
function Save(event, context, callback) {
    const uuid = event.pathParameters.uuid;
    const data = event.body;
    const p = uuid ? Repository.Node.find(context.hyperdoc.session, uuid) : Promise.resolve(new Node());
    return p.then(node => {
        if (!node) {
            util_1.HandleHttpResponse.notFound(callback, 'Node ' + uuid + ' not found');
        }
        else {
            node.data = data;
            return Repository.Node.save(context.hyperdoc.session, node).then(node => {
                util_1.HandleHttpResponse.ok(callback, node.toJSON());
            });
        }
    });
}
function Delete(event, context, callback) {
    const uuid = event.pathParameters.uuid;
    return Repository.Node.find(context.hyperdoc.session, uuid).then(node => {
        if (!node) {
            util_1.HandleHttpResponse.notFound(callback, 'Node ' + uuid + ' not found');
        }
        else {
            return Repository.Node.delete(context.hyperdoc.session, uuid).then(res => {
                util_1.HandleHttpResponse.ok(callback, {});
            });
        }
    });
}
module.exports = wrapper_1.wrapAWSLambdaModule({
    get: Get,
    post: Save,
    put: Save,
    delete: Delete
});
