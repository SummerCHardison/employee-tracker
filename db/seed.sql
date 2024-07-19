INSERT INTO department (name) VALUES
    ('finance'),
    ('HR');

INSERT INTO role (title, salary, department_id) VALUES
    ('manager', 50000.00, 1),
    ('supervisor', 60000.00, 2);

INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES
    ('Ashley', 'Benson', 1, null),
    ('Billy', 'Joe', 2, 1);