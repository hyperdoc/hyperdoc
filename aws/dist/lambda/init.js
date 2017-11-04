'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const config = require("../config");
const store_1 = require("../store");
const storeRegistry = store_1.initStoreRegistry(config.aws);
const Hyperdoc = require("hyperdoc-core");
Hyperdoc.Repository.configure(config, storeRegistry);
exports.H = Hyperdoc;
