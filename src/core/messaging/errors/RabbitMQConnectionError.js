"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var RabbitMQConnectionError = /** @class */ (function (_super) {
    __extends(RabbitMQConnectionError, _super);
    function RabbitMQConnectionError(msg, connectionSettings) {
        var _this = _super.call(this, msg) || this;
        Error.captureStackTrace(_this, _this.constructor);
        _this.connectionSettings = connectionSettings;
        return _this;
    }
    return RabbitMQConnectionError;
}(Error));
exports.RabbitMQConnectionError = RabbitMQConnectionError;
