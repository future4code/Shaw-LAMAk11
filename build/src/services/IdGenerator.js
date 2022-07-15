"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IdGenerator = void 0;
var uuid_1 = require("uuid");
var IdGenerator = (function () {
    function IdGenerator() {
    }
    IdGenerator.prototype.generateId = function () {
        return (0, uuid_1.v4)();
    };
    return IdGenerator;
}());
exports.IdGenerator = IdGenerator;
//# sourceMappingURL=IdGenerator.js.map