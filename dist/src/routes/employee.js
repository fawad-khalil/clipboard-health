"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authentication_1 = require("../middelwares/auth/authentication");
const authorisation_1 = require("../middelwares/auth/authorisation");
const empolyee_controller_1 = require("../controllers/empolyee.controller");
const router = express_1.default.Router();
const employeeController = new empolyee_controller_1.EmployeeController();
router.get('/', [
    authentication_1.authenticate,
    (0, authorisation_1.authorise)({ hasRole: ["user", "admin"] }),
    employeeController.getEmployees,
]);
router.get('/salary-statistics', [
    authentication_1.authenticate,
    (0, authorisation_1.authorise)({ hasRole: ["user", "admin"] }),
    employeeController.getSalaryStatistics,
]);
router.get('/salary-statistics/department', [
    authentication_1.authenticate,
    (0, authorisation_1.authorise)({ hasRole: ["user", "admin"] }),
    employeeController.getDepartmentSalaryStatistics,
]);
router.get('/salary-statistics/department-sub-department', [
    authentication_1.authenticate,
    (0, authorisation_1.authorise)({ hasRole: ["user", "admin"] }),
    employeeController.getDepartmentSubDepartmentSalaryStatistics,
]);
router.post('/', [
    authentication_1.authenticate,
    (0, authorisation_1.authorise)({ hasRole: ["admin"] }),
    employeeController.add,
]);
router.delete('/:id', [
    authentication_1.authenticate,
    (0, authorisation_1.authorise)({ hasRole: ["admin"] }),
    employeeController.delete,
]);
module.exports = router;
//# sourceMappingURL=employee.js.map