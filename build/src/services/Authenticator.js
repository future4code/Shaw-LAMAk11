"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Authenticator = void 0;
var jwt = __importStar(require("jsonwebtoken"));
var Authenticator = (function () {
    function Authenticator() {
    }
    Authenticator.prototype.generateToken = function (input, expiresIn) {
        if (expiresIn === void 0) { expiresIn = process.env.ACCESS_TOKEN_EXPIRES_IN; }
        var token = jwt.sign({
            id: input.id,
            role: input.role
        }, process.env.JWT_KEY, {
            expiresIn: expiresIn,
        });
        return token;
    };
    Authenticator.prototype.getDataFromToken = function (token) {
        var payload = jwt.verify(token, process.env.JWT_KEY);
        var result = {
            id: payload.id,
            role: payload.role
        };
        return result;
    };
    return Authenticator;
}());
exports.Authenticator = Authenticator;
//# sourceMappingURL=Authenticator.js.map