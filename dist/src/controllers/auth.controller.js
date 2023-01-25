"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const auth_service_1 = require("../services/auth.service");
const constants_1 = require("../constants");
class AuthController {
    constructor() {
        this.signin = (req, res) => {
            try {
                const auth = this.authService.signin(req.body);
                if (auth) {
                    res.status(200).send({ token: auth });
                }
                else {
                    res.status(401).send({ error: constants_1.AUTH_FAILED });
                }
            }
            catch (error) {
                res.status(500).send({ message: constants_1.INTERNAL_SERVER_ERROR, error });
            }
        };
        this.signout = (req, res) => {
            const { authorization } = req.headers;
            try {
                this.authService.signout(authorization.split(' ')[1]);
                res.status(200).send({ message: constants_1.SIGNOUT_200 });
            }
            catch (error) {
                res.status(500).send({ message: constants_1.INTERNAL_SERVER_ERROR, error });
            }
        };
        this.authService = new auth_service_1.AuthService();
    }
}
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map