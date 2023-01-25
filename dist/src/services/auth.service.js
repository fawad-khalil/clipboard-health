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
exports.AuthService = void 0;
const redis_service_1 = require("./redis.service");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../constants/config");
const tempUsers = [
    { uid: '1', email: 'john@example.com', password: 'user123', role: 'user' },
    { uid: '2', email: 'johannes@example.com', password: 'admin123', role: 'admin' }
];
class AuthService {
    constructor(redisService) {
        if (redisService) {
            this._redis = redisService;
            return;
        }
        this._redis = new redis_service_1.RedisService();
    }
    matchPassword(email, password) {
        return tempUsers.find(u => u.email === email && u.password === password);
    }
    ;
    signin(obj, secret) {
        const user = this.matchPassword(obj.email, obj.password);
        if (user) {
            delete user.password;
            const token = jsonwebtoken_1.default.sign(user, secret || config_1.JWT_SECRET);
            this._redis.set(user.uid, token);
            return token;
        }
        else {
            return false;
        }
    }
    ;
    signout(uid) {
        return __awaiter(this, void 0, void 0, function* () {
            this._redis.delete(uid);
        });
    }
    ;
}
exports.AuthService = AuthService;
;
//# sourceMappingURL=auth.service.js.map