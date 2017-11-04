'use strict';
const Model = require("./model");
const repository_1 = require("./repository");
const Store = require("./store");
module.exports = {
    Model: Model,
    Repository: new repository_1.Repository(),
    Store: Store,
    Config: {}
};
