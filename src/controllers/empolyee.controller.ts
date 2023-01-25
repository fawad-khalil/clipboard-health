import { EmployeeService } from '../services/employee.service';
import {Request, Response} from "express";
import { ADD_EMPLOYEE_500, ADD_EMPLOYEE_201, DELETE_EMPLOYEE_200, DELETE_EMPLOYEE_500, GET_EMPLOYEES_500, GET_SS_EMPLOYEE_500 } from '../constants';

export class EmployeeController {
  private employeeService: EmployeeService;

  constructor() {
    this.employeeService = new EmployeeService();
  }

  // get all employees
  public getEmployees = async (_req: Request, res: Response) => {
    try {
      const employees = await this.employeeService.getEmployees();
      res.status(200).json(employees);
    } catch(error) {
      res.status(500).send({ message: GET_EMPLOYEES_500, error });  
    }
  }

  // create employee function
  public add = async (req: Request, res: Response) => {
    try {
      const result = await this.employeeService.add(req.body);
      if (!result.success) {
        res.status(400).send({ message: "Bad request", error: result.error });
        return;
      }
      res.status(201).send({ message: ADD_EMPLOYEE_201 });
    } catch (error) {
      res.status(500).send({ message: ADD_EMPLOYEE_500, error });    
    }
  }

  // get SS of employees
  public getSalaryStatistics = async (req: Request, res: Response) => {
    try {
      const salaryStatistics = await this.employeeService.getSalaryStatistics(req.query);
      res.status(200).send(salaryStatistics);
    } catch (error) {
      res.status(500).send({ message: GET_SS_EMPLOYEE_500, error });
    }
  }

  // get Department wise SS
  public getDepartmentSalaryStatistics = async (_req: Request, res: Response) => {
    try{
      const salaryStatistics = await this.employeeService.getDepartmentSalaryStatistics();
      res.status(200).send(salaryStatistics);
    } catch(error) {
      res.status(500).send({ message: GET_SS_EMPLOYEE_500, error });
    }
  }
  
  // get Department sub department wise SS
  public getDepartmentSubDepartmentSalaryStatistics = async (_req: Request, res: Response) => {
    try{
      const salaryStatistics = await this.employeeService.getDepartmentSubDepartmentSalaryStatistics();
      res.status(200).send(salaryStatistics);
    } catch(error) {
      res.status(500).send({ message: GET_SS_EMPLOYEE_500, error });
    }
  }

  // delete employee function
  public delete = async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id)
      await this.employeeService.delete(id);

      res.status(200).send({ message: DELETE_EMPLOYEE_200 });
    } catch (error) {
      res.status(500).send({ message: DELETE_EMPLOYEE_500, error });
    }
  }
}
