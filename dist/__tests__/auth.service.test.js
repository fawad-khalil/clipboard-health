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
Object.defineProperty(exports, "__esModule", { value: true });
const redisMock = require("redis-mock");
const redis_service_1 = require("../src/services/redis.service");
const auth_service_1 = require("../src/services/auth.service");
describe('Auth Service', () => {
    let redis;
    beforeAll(() => {
        const client = redisMock.createClient();
        redis = new redis_service_1.RedisService(client);
    });
    it('should return a token if the email and password match', () => __awaiter(void 0, void 0, void 0, function* () {
        jest.spyOn(redis, 'set').mockImplementation(() => Promise.resolve('true'));
        const authService = new auth_service_1.AuthService(redis);
        const token = authService.signin({ email: 'johannes@example.com', password: 'admin123' }, 'secret');
        expect(token).toBeTruthy();
    }));
    it('should return false if the email and password do not match', () => __awaiter(void 0, void 0, void 0, function* () {
        jest.spyOn(redis, 'set').mockImplementation(() => Promise.resolve('true'));
        const authService = new auth_service_1.AuthService(redis);
        const token = authService.signin({ email: 'test@example.com', password: 'testpassword' });
        expect(token).toEqual(false);
    }));
});
//# sourceMappingURL=auth.service.test.js.map