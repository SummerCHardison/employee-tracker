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
        }
    });

const viewDepartments = function () {
    pool.query(`SELECT * FROM department`, (err, res) => {
        if (err) {
            throw err;
        }
        console.table(res, ["id", "name"]);
    })
}

const viewRoles = function () {
    pool.query(`SELECT * FROM role`, (err, res) => {
        if (err) {
            throw err;
        }
        console.table(res);
    })
}

const viewEmployees = function () {
    pool.query(`SELECT * FROM employee`, (err, res) => {
        if (err) {
            throw err;
        }
        console.table(res);
    })
}

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});