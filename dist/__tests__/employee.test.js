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
const ormconfig_1 = require("../ormconfig/ormconfig");
require("reflect-metadata");
const request = require("supertest");
const router = require("../src/app");
const { EmployeeController, } = require("../src/controllers/empolyee.controller");
const { Employees } = require("../__mocks__/employee");
const redis = require("redis-mock");
const statistics_util_1 = require("../src/utils/statistics.util");
const employee_1 = require("../src/entity/employee");
const employee_service_1 = require("../src/services/employee.service");
describe("Employees CURD", () => {
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield ormconfig_1.connectionSource.initialize();
    }));
    it("should add a new employee", () => __awaiter(void 0, void 0, void 0, function* () {
        let repository = ormconfig_1.connectionSource.getRepository(employee_1.Employee);
        jest.spyOn(repository, 'save').mockResolvedValue({ id: 10, name: 'John Doe', salary: '50000', currency: 'USD', department: 'IT', sub_department: 'Software Development', on_contract: 'true', deleted_at: null });
        const employeeService = new employee_service_1.EmployeeService();
        const newEmployee = yield employeeService.add({ name: 'John Doe', salary: '50000', currency: 'USD', department: 'IT', sub_department: 'Software Development', on_contract: 'true' });
        expect(repository.save).toHaveBeenCalledWith({ name: 'John Doe', salary: '50000', currency: 'USD', department: 'IT', sub_department: 'Software Development', on_contract: 'true' });
        expect(newEmployee).toEqual({ id: 10, name: 'John Doe', salary: '50000', currency: 'USD', department: 'IT', sub_department: 'Software Development', on_contract: 'true', deleted_at: null });
    }));
    it("should return all employees", () => __awaiter(void 0, void 0, void 0, function* () {
        let repository = ormconfig_1.connectionSource.getRepository(employee_1.Employee);
        jest.spyOn(repository, 'find').mockResolvedValue(Employees);
        const employeeService = new employee_service_1.EmployeeService();
        const employees = yield employeeService.getEmployees();
        expect(repository.find).toHaveBeenCalled();
        expect(employees).toEqual(Employees);
    }));
    it("should return statistics of all employees", () => __awaiter(void 0, void 0, void 0, function* () {
        let repository = ormconfig_1.connectionSource.getRepository(employee_1.Employee);
        const statistics = yield (0, statistics_util_1.getStatistics)({
            repository,
            tableName: "employee",
            fieldName: "salary",
        });
        expect(statistics).toEqual([
            { mean: 22295010.0, min: "110000", max: "90000" },
        ]);
    }));
    it("should return statistics of on contract employees", () => __awaiter(void 0, void 0, void 0, function* () {
        let repository = ormconfig_1.connectionSource.getRepository(employee_1.Employee);
        const filters = [{ field: "on_contract", operator: "=", value: true }];
        const statistics = yield (0, statistics_util_1.getStatistics)({
            repository,
            tableName: "employee",
            fieldName: "salary",
            filters,
        });
        expect(statistics).toEqual([
            { mean: 100000.0, min: "110000", max: "90000" },
        ]);
    }));
    it("should return statistics department wise", () => __awaiter(void 0, void 0, void 0, function* () {
        let repository = ormconfig_1.connectionSource.getRepository(employee_1.Employee);
        const groupBy = "department";
        const statistics = yield (0, statistics_util_1.getStatistics)({
            repository,
            tableName: "employee",
            fieldName: "salary",
            groupBy,
            columns: "department",
        });
        expect(statistics).toEqual([
            { department: "Administration", mean: 30, min: "30", max: "30" },
            { department: "Banking", mean: 90000, min: "90000", max: "90000" },
            {
                department: "Engineering",
                mean: 40099006,
                min: "110000",
                max: "30",
            },
            { department: "Operations", mean: 35015, min: "30", max: "70000" },
        ]);
    }));
    it("should return statistics department and sub department wise", () => __awaiter(void 0, void 0, void 0, function* () {
        let repository = ormconfig_1.connectionSource.getRepository(employee_1.Employee);
        const groupBy = "department,sub_department";
        const statistics = yield (0, statistics_util_1.getStatistics)({
            repository,
            tableName: "employee",
            fieldName: "salary",
            groupBy,
            columns: "department, sub_department",
        });
        expect(statistics).toEqual([
            {
                department: "Administration",
                sub_department: "Agriculture",
                mean: 30,
                min: "30",
                max: "30",
            },
            {
                department: "Banking",
                sub_department: "Loan",
                mean: 90000,
                min: "90000",
                max: "90000",
            },
            {
                department: "Engineering",
                sub_department: "Platform",
                mean: 40099006,
                min: "110000",
                max: "30",
            },
            {
                department: "Operations",
                sub_department: "CustomerOnboarding",
                mean: 35015,
                min: "30",
                max: "70000",
            },
        ]);
    }));
    it('should delete an employee', () => __awaiter(void 0, void 0, void 0, function* () {
        let repository = ormconfig_1.connectionSource.getRepository(employee_1.Employee);
        const employee = { id: 10, name: 'John Doe', salary: '50000', currency: 'USD', department: 'IT', sub_department: 'Software Development', on_contract: 'true', deleted_at: null };
        jest.spyOn(repository, 'findOne').mockResolvedValue(employee);
        jest.spyOn(repository, 'save').mockResolvedValue(employee);
        const employeeService = new employee_service_1.EmployeeService();
        yield employeeService.delete(10);
        expect(repository.findOne).toHaveBeenCalledWith({ where: { id: 10 } });
        expect(repository.save).toHaveBeenCalledWith({ id: 10, name: 'John Doe', salary: '50000', currency: 'USD', department: 'IT', sub_department: 'Software Development', on_contract: 'true', deleted_at: expect.any(Date) });
    }));
});
//# sourceMappingURL=employee.test.js.map