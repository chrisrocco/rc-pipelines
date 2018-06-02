"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
exports.__esModule = true;
var express_1 = require("express");
var body_parser_1 = require("body-parser");
var morgan_1 = require("morgan");
var dotenv = require("dotenv");
var helper_1 = require("./core/config/helper");
var _config_1 = require("./_config");
var connect_1 = require("./core/messaging/connect");
var httpErrorHandler_1 = require("./core/errors/httpErrorHandler");
var connect_2 = require("./core/database/connect");
var setupListeners_1 = require("./setupListeners");
var _service_registry_1 = require("./_service-registry");
/**
 * COMPOSITION ROOT
 * ========================
 */
exports.getApp = function () { return __awaiter(_this, void 0, void 0, function () {
    var config, _a, channel, connection, dbConn, app;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                // load environment and config
                dotenv.config({ path: ".env" });
                config = helper_1.getConfigHelper(_config_1.getConfig(process.env));
                return [4 /*yield*/, connect_1.connectToRabbitMQ({ config: config })
                    // connect to mysql database
                ];
            case 1:
                _a = _b.sent(), channel = _a.channel, connection = _a.connection;
                return [4 /*yield*/, connect_2.connectToDB({ config: config })
                    // register pipes
                ];
            case 2:
                dbConn = _b.sent();
                // register pipes
                setupListeners_1.setupListeners({ registry: _service_registry_1.SERVICES, dbConn: dbConn, channel: channel });
                app = express_1["default"]();
                app.set('port', config('port'));
                app.use(body_parser_1["default"].json());
                app.use(body_parser_1["default"].urlencoded({ extended: true }));
                app.use(morgan_1["default"]('dev'));
                app.use(httpErrorHandler_1.httpErrorHandler);
                app.use(function (err, _, __, ___) {
                    console.error('unhandled error: ', err);
                });
                return [2 /*return*/, app];
        }
    });
}); };
