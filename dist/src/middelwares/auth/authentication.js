"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate = void 0;
const constants_1 = require("../../constants");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../../constants/config");
const authenticate = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { authorization } = req.headers;
    if (!authorization) {
        return res.status(401).json({ message: constants_1.AUTH_FAILED });
    }
    if (!authorization.startsWith("Bearer ")) {
        return res.status(401).json({ message: constants_1.AUTH_FAILED });
    }
    const split = authorization.split("Bearer ");
    if (split.length !== 2) {
        return res.status(401).json({ message: constants_1.AUTH_FAILED });
    }
    const token = split[1];
    try {
        const decodedToken = (yield jsonwebtoken_1.default.verify(token, config_1.JWT_SECRET || 'secret'));
        res.locals = Object.assign(Object.assign({}, res.locals), { uid: decodedToken.uid, role: decodedToken.role, email: decodedToken.email });
        return next();
    }
    catch (error) {
        console.error(`${error.code} -  ${error.message}`);
        return res.status(500).json({ message: constants_1.INTERNAL_SERVER_ERROR });
    }
});
exports.authenticate = authenticate;
//# sourceMappingURL=authentication.js.map