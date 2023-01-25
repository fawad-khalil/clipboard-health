import { getStatistics } from "../utils/statistics.util";
import { Repository } from "typeorm";
import { Employee, joiSchema } from "../entity/employee";
import { getUTCTime } from "../utils/time.util";
import { connectionSource } from "../../ormconfig/ormconfig";
import { ValidationError } from "class-validator";
import { validate } from 'class-validator';
import Joi from "@hapi/joi";

export class EmployeeService {
  private employeeRepository: Repository<Employee>;

  constructor() {
    this.employeeRepository = connectionSource.getRepository(Employee);
  }

  validateEmployee(employee: Employee): Joi.ValidationResult {
    return joiSchema.validate(employee);
  }

  public async getEmployees(): Promise<Employee[]> {
    const employees = await this.employeeRepository.find();

    return employees;
  }

  //create employee function
  public async add(employee: {
    name: string;
    salary: string;
    currency: string;
    department: string;
    sub_department: string;
    on_contract: string;
  }) {
    const newEmployee = new Employee();

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

    const save = await this.employeeRepository.save(newEmployee);

    return { success: true, result: save };
  }

  public async getSalaryStatistics(filters: any) {
    const salaryData = await getStatistics({
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
  }

  async getDepartmentSalaryStatistics() {
    const salaryData = await getStatistics({
      repository: this.employeeRepository,
      tableName: "employee",
      fieldName: "salary",
      groupBy: "department",
      columns: "department",
    });

    return salaryData;
  }

  async getDepartmentSubDepartmentSalaryStatistics() {
    const salaryData = await getStatistics({
      repository: this.employeeRepository,
      tableName: "employee",
      fieldName: "salary",
      groupBy: "department,sub_department",
      columns: "department,sub_department",
    });
    return salaryData;
  }

  public async delete(id: number) {
    const employee = await this.employeeRepository.findOne({ where: { id } });

    if (employee) {
      employee.deleted_at = getUTCTime(new Date());

      await this.employeeRepository.save(employee);
    }
  }
}
