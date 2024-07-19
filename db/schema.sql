DROP DATABASE IF EXISTS business_db;
CREATE DATABASE business_db;
-- refreshing data base to blank so we can start with a clean slate

\c business_db;

-- connects to database

CREATE TABLE department (
    id SERIAL PRIMARY KEY,
    name VARCHAR(30) UNIQUE NOT NULL
    );
-- creates department table with inputs for id and name

CREATE TABLE role (
    id SERIAL PRIMARY KEY,
    title VARCHAR(30) UNIQUE NOT NULL,
    salary DECIMAL NOT NULL,
    department_id INTEGER NOT NULL,
    FOREIGN KEY (department_id) REFERENCES department(id)
);
-- creates role table with inputs for id, title, salary, and department_id

CREATE TABLE employee (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INTEGER NOT NULL,
    FOREIGN KEY (role_id) REFERENCES role(id),
    manager_id INTEGER,
    FOREIGN KEY (manager_id) REFERENCES employee(id)
);

-- creates employee table with inputs for id, first_name, last_name, role_id, and manager_id