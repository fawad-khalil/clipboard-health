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
exports.getStatistics = void 0;
function getStatistics(op) {
    return __awaiter(this, void 0, void 0, function* () {
        const columnsSelect = op.columns ? `${op.columns},` : '';
        let query = `SELECT ${columnsSelect} AVG(${op.fieldName}) as mean, MIN(${op.fieldName}) as min, MAX(${op.fieldName}) as max FROM ${op.tableName}`;
        if (op.filters && op.filters.length > 0) {
            query += ` WHERE 1 = 1`;
            op.filters.forEach(filter => {
                query += ` AND ${filter.field} ${filter.operator} '${filter.value}'`;
            });
        }
        if (op.groupBy) {
            query += ` GROUP BY ${op.groupBy}`;
        }
        const statistics = yield op.repository.query(query);
        return statistics;
    });
}
exports.getStatistics = getStatistics;
//# sourceMappingURL=statistics.util.js.map