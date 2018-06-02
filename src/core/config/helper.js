"use strict";
exports.__esModule = true;
var lodash = require("lodash");
exports.getConfigHelper = function (config) { return function (key) {
    var V = lodash.get(config, key);
    if (V === null)
        throw new Error("Invalid config value accessed: " + key);
    return V;
}; };
