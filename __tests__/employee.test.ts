import { connectionSource } from "../ormconfig/ormconfig";
import "reflect-metadata";
import { authenticate } from "../src/middelwares/auth/authentication";
import { authorise } from "../src/middelwares/auth/authorisation";
import { AuthService } from "../src/services/auth.service";
import { RedisService } from "../src/services/redis.service";
const request = require("supertest");
const router = require("../src/app");
const {
  EmployeeController,
} = require("../src/controllers/empolyee.controller");
const { Employees } = require("../__mocks__/employee");
const redis = require("redis-mock");
import { getStatistics } from "../src/utils/statistics.util";

import { getRepository } from "typeorm";
import { Employee } from "../src/entity/employee";
import { EmployeeService } from "../src/services/employee.service";

describe("Employees CURD", () => {
  beforeAll(async () => {
    await connectionSource.initialize();
  });

  it("should add a new employee", async () => {
    let repository = connectionSource.getRepository(Employee);
    jest.spyOn(repository, 'save').mockResolvedValue({ id: 10, name: 'John Doe', salary: '50000', currency: 'USD', department: 'IT', sub_department: 'Software Development', on_contract: 'true', deleted_at: null });
    const employeeService = new EmployeeService();
    const newEmployee = await employeeService.add({ name: 'John Doe', salary: '50000', currency: 'USD', department: 'IT', sub_department: 'Software Development', on_contract: 'true' });
    expect(repository.save).toHaveBeenCalledWith({ name: 'John Doe', salary: '50000', currency: 'USD', department: 'IT', sub_department: 'Software Development', on_contract: 'true' });
    expect(newEmployee).toEqual({ id: 10, name: 'John Doe', salary: '50000', currency: 'USD', department: 'IT', sub_department: 'Software Development', on_contract: 'true', deleted_at: null  });  
  });

  it("should return all employees", async () => {
    let repository = connectionSource.getRepository(Employee);
    jest.spyOn(repository, 'find').mockResolvedValue(Employees);
    const employeeService = new EmployeeService();
    const employees = await employeeService.getEmployees();

    expect(repository.find).toHaveBeenCalled();
    expect(employees).toEqual(Employees);
  });

  it("should return statistics of all employees", async () => {
    let repository = connectionSource.getRepository(Employee);

    const statistics = await getStatistics({
      repository,
      tableName: "employee",
      fieldName: "salary",
    });
    expect(statistics).toEqual([
      { mean: 22295010.0, min: "110000", max: "90000" },
    ]);
  });

  it("should return statistics of on contract employees", async () => {
    let repository = connectionSource.getRepository(Employee);

    const filters = [{ field: "on_contract", operator: "=", value: true }];
    const statistics = await getStatistics({
      repository,
      tableName: "employee",
      fieldName: "salary",
      filters,
    });
    expect(statistics).toEqual([
      { mean: 100000.0, min: "110000", max: "90000" },
    ]);
  });

  it("should return statistics department wise", async () => {
    let repository = connectionSource.getRepository(Employee);
    const groupBy = "department";
    const statistics = await getStatistics({
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
  });

  it("should return statistics department and sub department wise", async () => {
    let repository = connectionSource.getRepository(Employee);
    const groupBy = "department,sub_department";
    const statistics = await getStatistics({
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
  });

  it('should delete an employee', async () => {
    let repository = connectionSource.getRepository(Employee);
    const employee: Employee = { id: 10, name: 'John Doe', salary: '50000', currency: 'USD', department: 'IT', sub_department: 'Software Development', on_contract: 'true', deleted_at: null };
    jest.spyOn(repository, 'findOne').mockResolvedValue(employee);
    jest.spyOn(repository, 'save').mockResolvedValue(employee);
    const employeeService = new EmployeeService();
    await employeeService.delete(10);
    expect(repository.findOne).toHaveBeenCalledWith({ where: { id: 10 } });
    expect(repository.save).toHaveBeenCalledWith({ id: 10, name: 'John Doe', salary: '50000', currency: 'USD', department: 'IT', sub_department: 'Software Development', on_contract: 'true', deleted_at: expect.any(Date) });
  });
});
