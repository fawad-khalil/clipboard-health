import express from 'express';
import { authenticate } from '../middelwares/auth/authentication';
import { authorise } from '../middelwares/auth/authorisation';
import { EmployeeController } from '../controllers/empolyee.controller';
const router = express.Router();

const employeeController = new EmployeeController();

router.get('/', [
  authenticate,
  authorise({ hasRole: ["user", "admin"] }),
  employeeController.getEmployees,
]);
router.get('/salary-statistics', [
  authenticate,
  authorise({ hasRole: ["user", "admin"] }),
  employeeController.getSalaryStatistics,
]);
router.get('/salary-statistics/department', [
  authenticate,
  authorise({ hasRole: ["user", "admin"] }),
  employeeController.getDepartmentSalaryStatistics,
]);
router.get('/salary-statistics/department-sub-department', [
  authenticate,
  authorise({ hasRole: ["user", "admin"] }),
  employeeController.getDepartmentSubDepartmentSalaryStatistics,
]);
router.post('/', [
  authenticate,
  authorise({ hasRole: ["admin"] }),
  employeeController.add,
]);
router.delete('/:id', [
  authenticate,
  authorise({ hasRole: ["admin"] }),
  employeeController.delete,
]);

module.exports = router;
