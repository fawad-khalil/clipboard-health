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
exports.EmployeeService = void 0;
const statistics_util_1 = require("../utils/statistics.util");
const employee_1 = require("../entity/employee");
const time_util_1 = require("../utils/time.util");
const ormconfig_1 = require("../../ormconfig/ormconfig");
class EmployeeService {
    constructor() {
        this.employeeRepository = ormconfig_1.connectionSource.getRepository(employee_1.Employee);
    }
    validateEmployee(employee) {
        return employee_1.joiSchema.validate(employee);
    }
    getEmployees() {
        return __awaiter(this, void 0, void 0, function* () {
            const employees = yield this.employeeRepository.find();
            return employees;
        });
    }
    //create employee function
    add(employee) {
        return __awaiter(this, void 0, void 0, function* () {
            const newEmployee = new employee_1.Employee();
            newEmployee.name = employee.name;
            newEmployee.salary = employee.salary;
            newEmployee.currency = employee.currency;
            newEmployee.department = employee.department;
            newEmployee.sub_department = employee.sub_department;
            newEmployee.on_contract = employee.on_contract;
            const { error } = this.validateEmployee(newEmployee);
            if (error) {
                return { success: false, error };
            }
            const save = yield this.employeeRepository.save(newEmployee);
            return { success: true, result: save };
        });
    }
    getSalaryStatistics(filters) {
        return __awaiter(this, void 0, void 0, function* () {
            const salaryData = yield (0, statistics_util_1.getStatistics)({
                repository: this.employeeRepository,
                tableName: "employee",
                fieldName: "salary",
                filters: Object.keys(filters).map((key) => ({
                    field: key,
                    value: filters[key],
                    operator: "=",
                })),
            });
            return salaryData[0];
        });
    }
    getDepartmentSalaryStatistics() {
        return __awaiter(this, void 0, void 0, function* () {
            const salaryData = yield (0, statistics_util_1.getStatistics)({
                repository: this.employeeRepository,
                tableName: "employee",
                fieldName: "salary",
                groupBy: "department",
                columns: "department",
            });
            return salaryData;
        });
    }
    getDepartmentSubDepartmentSalaryStatistics() {
        return __awaiter(this, void 0, void 0, function* () {
            const salaryData = yield (0, statistics_util_1.getStatistics)({
                repository: this.employeeRepository,
                tableName: "employee",
                fieldName: "salary",
                groupBy: "department,sub_department",
                columns: "department,sub_department",
            });
            return salaryData;
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const employee = yield this.employeeRepository.findOne({ where: { id } });
            if (employee) {
                employee.deleted_at = (0, time_util_1.getUTCTime)(new Date());
                yield this.employeeRepository.save(employee);
            }
        });
    }
}
exports.EmployeeService = EmployeeService;
//# sourceMappingURL=employee.service.js.map