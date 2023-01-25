"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUTCTime = void 0;
function getUTCTime(date) {
    const utcDate = new Date(date.getTime());
    utcDate.setUTCHours(utcDate.getUTCHours(), 0, 0, 0);
    return utcDate;
}
exports.getUTCTime = getUTCTime;
//# sourceMappingURL=time.util.js.map