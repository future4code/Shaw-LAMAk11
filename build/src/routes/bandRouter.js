"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bandRouter = void 0;
var express_1 = __importDefault(require("express"));
var BandController_1 = require("../controller/BandController");
exports.bandRouter = express_1.default.Router();
var bandController = new BandController_1.BandController();
exports.bandRouter.post("/signup", bandController.signup);
//# sourceMappingURL=bandRouter.js.map