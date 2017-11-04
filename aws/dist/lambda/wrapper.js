'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = require("./util");
function wrapAWSLambdaFunction(func) {
    return (event, context, callback) => {
        try {
            context.hyperdoc = context.hyperdoc || {};
            var res = func(event, context, callback);
            if (!(res instanceof Promise)) {
                util_1.HandleHttpResponse.internalError(callback, 'API Lambda function must respond with a Promise');
            }
            res.catch(err => {
                console.log(err);
                util_1.HandleHttpResponse.internalError(callback, err.message);
            });
        }
        catch (e) {
            console.error('Uncaught exception', e, e.stack);
            util_1.HandleHttpResponse.internalError(callback, 'An internal error occurred');
        }
    };
}
exports.wrapAWSLambdaFunction = wrapAWSLambdaFunction;
function wrapAWSLambdaModule(module) {
    const wrappedModule = {};
    for (const key in module) {
        wrappedModule[key] = wrapAWSLambdaFunction(module[key]);
    }
    return wrappedModule;
}
exports.wrapAWSLambdaModule = wrapAWSLambdaModule;
