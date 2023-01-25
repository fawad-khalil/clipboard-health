"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorise = void 0;
const constants_1 = require("../../constants");
const authorise = (opts) => {
    return (_req, res, next) => {
        const { role, uid } = res.locals;
        // const { id } = req.params;
        // if (opts.allowSameUser && id && uid === id) return next();
        if (!role)
            return res.status(403).json({ message: constants_1.AUTHORISATION_FAILED });
        if (opts.hasRole.includes(role))
            return next();
        return res.status(403).json({ message: constants_1.AUTHORISATION_FAILED });
    };
};
exports.authorise = authorise;
//# sourceMappingURL=authorisation.js.map