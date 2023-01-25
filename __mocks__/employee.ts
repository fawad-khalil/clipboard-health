type Employee = {
  id: number,
    name: string,
    salary: string,
    currency: string,
    department: string,
    sub_department: string,
    on_contract: string,
    deleted_at?: Date,
};

export const Employees: Employee[] = [
  {
    id: 1,
    name: "Abhishek",
    salary: "145000",
    currency: "USD",
    department: "Engineering",
    sub_department: "Platform",
    on_contract: null,
    deleted_at: null,
  },
  {
    id: 2,
    name: "Anurag",
    salary: "90000",
    currency: "USD",
    department: "Banking",
    on_contract: "true",
    sub_department: "Loan",
    deleted_at: null,
  },
  {
    id: 3,
    name: "Himani",
    salary: "240000",
    currency: "USD",
    department: "Engineering",
    sub_department: "Platform",
    on_contract: null,
    deleted_at: null,
  },
  {
    id: 4,
    name: "Yatendra",
    salary: "30",
    currency: "USD",
    department: "Operations",
    sub_department: "CustomerOnboarding",
    on_contract: null,
    deleted_at: null,
  },
  {
    id: 5,
    name: "Ragini",
    salary: "30",
    currency: "USD",
    department: "Engineering",
    sub_department: "Platform",
    on_contract: null,
    deleted_at: null,
  },
  {
    id: 6,
    name: "Nikhil",
    salary: "110000",
    currency: "USD",
    on_contract: "true",
    department: "Engineering",
    sub_department: "Platform",
    deleted_at: null,
  },
  {
    id: 7,
    name: "Guljit",
    salary: "30",
    currency: "USD",
    department: "Administration",
    sub_department: "Agriculture",
    on_contract: null,
    deleted_at: null,
  },
  {
    id: 8,
    name: "Himanshu",
    salary: "70000",
    currency: "EUR",
    department: "Operations",
    sub_department: "CustomerOnboarding",
    on_contract: null,
    deleted_at: null,
  },
  {
    id: 9,
    name: "Anupam",
    salary: "200000000",
    currency: "INR",
    department: "Engineering",
    sub_department: "Platform",
    on_contract: null,
    deleted_at: null,
  },
];
