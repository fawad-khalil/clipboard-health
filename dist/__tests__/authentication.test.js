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
const constants_1 = require("../src/constants");
const authentication_1 = require("../src/middelwares/auth/authentication");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
describe('authenticate middleware', () => {
    let req;
    let res;
    let next;
    beforeEach(() => {
        req = { headers: { authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImpvaGFubmVzQGV4YW1wbGUuY29tIiwicm9sZSI6ImFkbWluIiwidWlkIjoiMiJ9.diNJu5QM_uNfH-9HhXiEtvF-CHaESuDtSyvsi4_6s6A' } };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis(),
            locals: {}
        };
        next = jest.fn();
    });
    it('should call next if the authorization header is valid', () => __awaiter(void 0, void 0, void 0, function* () {
        // jest.spyOn(jwt, 'verify').mockReturnValue({ uid: 'user_id', role: 'user', email: 'user@example.com' });
        // @ts-ignore
        yield (0, authentication_1.authenticate)(req, res, next);
        expect(next).toHaveBeenCalled();
        expect(res.locals).toEqual({ uid: '2', role: 'admin', email: 'johannes@example.com' });
    }));
    it('should return 401 if the authorization header is missing', () => __awaiter(void 0, void 0, void 0, function* () {
        req.headers.authorization = null;
        // @ts-ignore
        yield (0, authentication_1.authenticate)(req, res, next);
        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.json).toHaveBeenCalledWith({ message: constants_1.AUTH_FAILED });
    }));
    it('should return 401 if the authorization header is malformed', () => __awaiter(void 0, void 0, void 0, function* () {
        req.headers.authorization = 'invalid_token';
        // @ts-ignore
        yield (0, authentication_1.authenticate)(req, res, next);
        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.json).toHaveBeenCalledWith({ message: constants_1.AUTH_FAILED });
    }));
    it('should return 500 if the token is invalid', () => __awaiter(void 0, void 0, void 0, function* () {
        jest.spyOn(jsonwebtoken_1.default, 'verify').mockImplementation(() => {
            throw new Error('invalid token');
        });
    }));
});
//# sourceMappingURL=authentication.test.js.map