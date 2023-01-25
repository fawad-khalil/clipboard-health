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
exports.EmployeeController = void 0;
const employee_service_1 = require("../services/employee.service");
const constants_1 = require("../constants");
class EmployeeController {
    constructor() {
        // get all employees
        this.getEmployees = (_req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const employees = yield this.employeeService.getEmployees();
                res.status(200).json(employees);
            }
            catch (error) {
                res.status(500).send({ message: constants_1.GET_EMPLOYEES_500, error });
            }
        });
        // create employee function
        this.add = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.employeeService.add(req.body);
                if (!result.success) {
                    res.status(400).send({ message: "Bad request", error: result.error });
                }
                res.status(201).send({ message: constants_1.ADD_EMPLOYEE_201 });
            }
            catch (error) {
                res.status(500).send({ message: constants_1.ADD_EMPLOYEE_500, error });
            }
        });
        // get SS of employees
        this.getSalaryStatistics = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const salaryStatistics = yield this.employeeService.getSalaryStatistics(req.query);
                res.status(200).send(salaryStatistics);
            }
            catch (error) {
                res.status(500).send({ message: constants_1.GET_SS_EMPLOYEE_500, error });
            }
        });
        // get Department wise SS
        this.getDepartmentSalaryStatistics = (_req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const salaryStatistics = yield this.employeeService.getDepartmentSalaryStatistics();
                res.status(200).send(salaryStatistics);
            }
            catch (error) {
                res.status(500).send({ message: constants_1.GET_SS_EMPLOYEE_500, error });
            }
        });
        // get Department sub department wise SS
        this.getDepartmentSubDepartmentSalaryStatistics = (_req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const salaryStatistics = yield this.employeeService.getDepartmentSubDepartmentSalaryStatistics();
                res.status(200).send(salaryStatistics);
            }
            catch (error) {
                res.status(500).send({ message: constants_1.GET_SS_EMPLOYEE_500, error });
            }
        });
        // delete employee function
        this.delete = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const id = Number(req.params.id);
                yield this.employeeService.delete(id);
                res.status(200).send({ message: constants_1.DELETE_EMPLOYEE_200 });
            }
            catch (error) {
                res.status(500).send({ message: constants_1.DELETE_EMPLOYEE_500, error });
            }
        });
        this.employeeService = new employee_service_1.EmployeeService();
    }
}
exports.EmployeeController = EmployeeController;
//# sourceMappingURL=empolyee.controller.js.map