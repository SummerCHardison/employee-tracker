const inquirer = require('inquirer');
const { Pool } = require('pg');
const express = require('express');

const PORT = 3001;
const app = express();

app.use(express.json());

const pool = new Pool(
    {
        user: 'postgres',
        password: 'password',
        host: 'localhost',
        database: 'business_db'
    },
    console.log('Connected to the business_db database!')
);
pool.connect();

const prompts = () => {
inquirer
    .prompt([
        {
            type: "list",
            name: 'action',
            message: 'Which of the following would you like to do?',
            choices: ['view all departments', 'view all roles', 'view all employees', 'add a department', 'add a role', 'add an employee', 'update an employee role']
        }
    ])
    .then(answer => {
        switch (answer.action) {
            case 'view all departments':
                viewDepartments();
                break;
            case 'view all roles':
                viewRoles();
                break;
            case 'view all employees':
                viewEmployees();
                break;
            case 'add a department':
                addDepartment();
                break;
            case 'add a role':
                addRole();
                break;
            case 'add an employee':
                addEmployee();
                break;
            case 'update an employee role':
                updateEmployee();
                break;
        }
    });
};

const viewDepartments = function () {
    pool.query(`SELECT * FROM department`, (err, res) => {
        if (err) {
            throw err;
        }
        console.table(res.rows);
        prompts();
    })
}

const viewRoles = function () {
    pool.query(`SELECT * FROM role`, (err, res) => {
        if (err) {
            throw err;
        }
        console.table(res.rows);
        prompts();
    })
}

const viewEmployees = function () {
    pool.query(`SELECT * FROM employee`, (err, res) => {
        if (err) {
            throw err;
        }
        console.table(res.rows);
        prompts();
    })
}

const addDepartment = function () {
    inquirer
        .prompt({
            name: 'department',
            type: "input",
            message: "What is the name of the department you want to add?"
        })
        .then(answer => {
            pool.query(`INSERT INTO department(name) VALUES('${answer.department}')`, (err, res) => {
                if (err) {
                    throw err;
                }
                console.log('Department added!');
                viewDepartments();
            });
        });
};

const addRole = function () {
    inquirer
        .prompt([
        {
            name: 'roleName',
            type: "input",
            message: "What is the name of the role you want to add?"
        },
        {
            name: 'salary',
            type: "input",
            message: "What is the salary of the role you want to add?"
        },
        {
            name: 'departmentID',
            type: "input",
            message: "What department does the role you want to add belong to? (please enter valid department ID)"
        }
    ])
        .then(answer => {
            pool.query(`INSERT INTO role(title, salary, department_id) VALUES('${answer.roleName}', ${answer.salary}, ${answer.departmentID})`, (err, res) => {
                if (err) {
                    throw err;
                }
                console.log('Role added!');
                viewRoles();
            });
        });
};

const addEmployee = function () {
    inquirer
        .prompt([
        {
            name: 'firstName',
            type: "input",
            message: "What is the first name of the employee you want to add?"
        },
        {
            name: 'lastName',
            type: "input",
            message: "What is the last name of the employee you want to add?"
        },
        {
            name: 'role',
            type: "input",
            message: "What is the role of the employee you want to add? (please enter valid role ID)"
        },
        {
            name:'manager',
            type: "input",
            message: "What is the employee id of the manager for this employee?"
        }
    ])
        .then(answer => {
            pool.query(`INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES('${answer.firstName}', '${answer.lastName}', ${answer.role}, ${answer.manager})`, (err, res) => {
                if (err) {
                    throw err;
                }
                console.log('Employee added!');
                viewEmployees();
            });
        });
};

const updateEmployee = function () {
    inquirer
        .prompt([
        {
            name: "employeeID",
            type: "input",
            message: "What is the ID of the employee you want to update?"
        },
        {
            name: 'newRole',
            type: "input",
            message: "What is the new role of the employee you want to add? (please enter valid role ID. Enter previous ID if not changing)"
        },
        {
            name:'newManager',
            type: "input",
            message: "What is the employee id of the new manager for this employee? (enter previous ID or null if not changing)"
        }
    ])
        .then(answer => {
            pool.query(`UPDATE employee SET role_id = ${answer.newRole}, manager_id = ${answer.newManager} WHERE id = ${answer.employeeID}`, (err, res) => {
                if (err) {
                    throw err;
                }
                console.log('Employee updated!');
                viewEmployees();
            });
        });
};

prompts();

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});