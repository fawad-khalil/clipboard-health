# Let's Slice and Dice
# Employee Management API
This API provides endpoints for managing employee data including getting all employees, adding a new employee, getting salary statistics for all employees, getting salary statistics for employees on contract, getting department-wise salary statistics, and deleting an employee.

## Getting Started
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites
- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)
- [Yarn](https://yarnpkg.com/)

### Clone Repository
1. Extract the repository
1. Navigate to the project's root directory

    `cd fawad-khalil`

### Run Unit Tests
1. Run migrations

    `yarn migrate:test`
2. Seed the test database

    `yarn seed:test`
3. Run the tests
    `npx jest`  
    OR
    
    `yarn test`

The test suite should pass the following tests:
1. should return a token if the email and password match
2. should return false if the email and password do not match
3. should call next if the authorization header is valid
4. should return 401 if the authorization header is missing
5. should return 401 if the authorization header is malformed
6. should return 500 if the token is invalid
7. should call next if the user has the required role
8. should return 403 if the user does not have the required role
9. should return 403 if the role is not present in res.locals
10. should add a new employee
11. should return all employees
12. should return statistics of all employees
13. should return statistics of on contract employees
14. should return statistics department wise
15. should return statistics department and sub department wise
16. should delete an employee

### Running the API
1. Run migrations

    `yarn migrate:dev`
1. Seed the database

    `yarn seed:dev`
1. Build and run the project using Docker Compose

    `docker-compose up --build`     
    OR

    `yarn start:dev`

### API Endpoints
Method | Endpoint | Headers | Body | Description
--- | --- | --- | --- | --- 
POST | /auth | - | `{ "email": "johannes@example.com", "password": "admin123" }` | Sign in user
DELETE | /auth | Authorization: Bearer YOUR_TOKEN_HERE | - | Sign out user
GET	| /employees | Authorization: Bearer YOUR_TOKEN_HERE | - | Get all employees
GET | /employees/salary-stats | Authorization: Bearer YOUR_TOKEN_HERE | - |	Get salary statistics for all employees
GET	| /employees/salary-stats?on_contract=true | Authorization: Bearer YOUR_TOKEN_HERE | - | Get salary statistics for employees on contract
GET | /employees/salary-stats/department | Authorization: Bearer YOUR_TOKEN_HERE | - | Get department-wise salary statistics
GET	| /employees/salary-stats/department-sub-department | Authorization: Bearer YOUR_TOKEN_HERE | - | Get sub-department and department-wise salary statistics
POST | /employees | Authorization: Bearer YOUR_TOKEN_HERE | `{ "name": "Abhishek Bachan", "salary": "1450000", "currency": "USD", "department": "Engineering", "sub_department": "Agriculture" }` | Add a new employee
DELETE | /employees/:id | Authorization: Bearer YOUR_TOKEN_HERE | - | Delete an employee

### Example:

`curl --location --request GET 'http://localhost:3000/employees' --header 'Authorization: Bearer YOUR_TOKEN_HERE'`

### Built With
- [Node.js](https://nodejs.org/) - JavaScript runtime
- [Express](https://expressjs.com/) - Web framework for Node.js
- [TypeORM](https://typeorm.io/) - ORM for TypeScript and JavaScript
- [SQLite](https://www.sqlite.org/) - Database management system
- [Redis](https://redis.io/) - In-Memory DB management system

### Author
Fawad Khalil - [Github Profile](https://github.com/fawad-khalil)

### License


### Acknowledgments
Inspiration:

etc.

### Good Coding Practices that should be adhered to:
The coding practices that I think that should be adhered to are around the following non-functional requirements:
- Maintainability

    The code should be simple enough for the developers to understand, test and modify. Complex single liners and nested ternaries are big no-no most of the time and have compliance with KISS (Keep It Simple Stupid) principle. As it is said, "Any fool can write code that a computer can understand. Good programmers write code that humans can understand".

- Reusability

    The code should be broken down into units that they should be responsible for single purposes and can behave independently. This will result in a reusable code.
    The classes/functions/methods should adhere to SOLID (Single Responsibility, Open for extension/Closed, Liskov Substitution, Interface seggregation, Dependancy Inversion) principle.

- Interoperability

    The code should be able to work with other systems easily without modifying the original code.
- Portability

    The code should be able to run on different environments and platforms, meaning that it should be containerised and encapsulated.
- Reliability

    The code should perform with minimal failures and should be able to recover from failures as soon as possible.
- Availability

    The system should be available 24/7 and the scaling and extending activities should not compromise its availability.
- Security

    The code should not expose any vulnerabilities, and authentication and authorisation should be implemented carefully throughout the code.

- Extensibility

    The code should be extendible without modifications easily.

- Auto Deployment

    The code be able to be tested, linted and deployed automatically with zero or minimum human interaction and it should be configured to be scalable without any change in the code.

- Centralised resources

    The resources like constants and configurations should be implemented in a reusable and centralised manner such that they can updated easily whenever required with minimum number of changes.

fawad-khalil@hotmail.com

