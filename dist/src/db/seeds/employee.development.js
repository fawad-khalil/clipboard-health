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
const employee_1 = require("../../entity/employee");
class UserSeeder {
    run(dataSource, _factoryManager) {
        return __awaiter(this, void 0, void 0, function* () {
            const repository = dataSource.getRepository(employee_1.Employee);
            yield repository.insert([
                {
                    name: "Abhishek",
                    salary: "145000",
                    currency: "USD",
                    department: "Engineering",
                    sub_department: "Platform",
                },
                {
                    name: "Anurag",
                    salary: "90000",
                    currency: "USD",
                    department: "Banking",
                    on_contract: "true",
                    sub_department: "Loan",
                },
                {
                    name: "Himani",
                    salary: "240000",
                    currency: "USD",
                    department: "Engineering",
                    sub_department: "Platform",
                },
                {
                    name: "Yatendra",
                    salary: "30",
                    currency: "USD",
                    department: "Operations",
                    sub_department: "CustomerOnboarding",
                },
                {
                    name: "Ragini",
                    salary: "30",
                    currency: "USD",
                    department: "Engineering",
                    sub_department: "Platform",
                },
                {
                    name: "Nikhil",
                    salary: "110000",
                    currency: "USD",
                    on_contract: "true",
                    department: "Engineering",
                    sub_department: "Platform",
                },
                {
                    name: "Guljit",
                    salary: "30",
                    currency: "USD",
                    department: "Administration",
                    sub_department: "Agriculture",
                },
                {
                    name: "Himanshu",
                    salary: "70000",
                    currency: "EUR",
                    department: "Operations",
                    sub_department: "CustomerOnboarding",
                },
                {
                    name: "Anupam",
                    salary: "200000000",
                    currency: "INR",
                    department: "Engineering",
                    sub_department: "Platform",
                },
            ]);
        });
    }
}
exports.default = UserSeeder;
//# sourceMappingURL=employee.development.js.map