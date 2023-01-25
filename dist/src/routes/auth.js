"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_controller_1 = require("../controllers/auth.controller");
const router = express_1.default.Router();
const authController = new auth_controller_1.AuthController();
router.post('/', authController.signin);
router.delete('/', authController.signout);
module.exports = router;
//# sourceMappingURL=auth.js.map