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
const constants_1 = require("../src/constants");
const authorisation_1 = require("../src/middelwares/auth/authorisation");
describe('authorise middleware', () => {
    let req;
    let res;
    let next;
    // let authorise: (opts: AuthorisationOptions) => void;
    beforeEach(() => {
        req = {};
        res = {
            locals: { role: 'user', uid: 'user_id' },
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis()
        };
        next = jest.fn();
        // authorise = (opts) => authorise(opts);
    });
    it('should call next if the user has the required role', () => __awaiter(void 0, void 0, void 0, function* () {
        // @ts-ignore
        yield (0, authorisation_1.authorise)({ hasRole: ['user', 'admin'] })(req, res, next);
        expect(next).toHaveBeenCalled();
    }));
    it('should return 403 if the user does not have the required role', () => __awaiter(void 0, void 0, void 0, function* () {
        res.locals.role = 'guest';
        // @ts-ignore
        yield (0, authorisation_1.authorise)({ hasRole: ['user', 'admin'] })(req, res, next);
        expect(res.status).toHaveBeenCalledWith(403);
        expect(res.json).toHaveBeenCalledWith({ message: constants_1.AUTHORISATION_FAILED });
    }));
    it('should return 403 if the role is not present in res.locals', () => __awaiter(void 0, void 0, void 0, function* () {
        res.locals.role = undefined;
        // @ts-ignore
        yield (0, authorisation_1.authorise)({ hasRole: ['user', 'admin'] })(req, res, next);
        expect(res.status).toHaveBeenCalledWith(403);
        expect(res.json).toHaveBeenCalledWith({ message: constants_1.AUTHORISATION_FAILED });
    }));
});
//# sourceMappingURL=authorisation.test.js.map