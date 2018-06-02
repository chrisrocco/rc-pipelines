"use strict";
exports.__esModule = true;
var HTTPError_1 = require("./HTTPError");
exports.httpErrorHandler = function (err, req, res, next) {
    if (err instanceof HTTPError_1.HTTPError) {
        res.status(err.statusCode).json({
            msg: err.message,
            trace: err.stack
        });
    }
    else {
        res.status(500).json({
            msg: err.message,
            trace: err.stack
        });
    }
    // pass down pipeline for connection cleanup, logging, etc.
    next(err);
};
