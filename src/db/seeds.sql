\c employees

INSERT INTO department (department_name)
VALUES 
    ('Sales'),
    ('TI'),
    ('Finance'),
    ('Legal');
       
INSERT INTO manager (manager_name)
VALUES 
    ('Laura P Aristizabal'),
    ('Sandra Zuluaga'),
    ('Salome Palomino'),
    ('Berta Betancourth');

INSERT INTO role (role_title, salary, department_id)
VALUES 
    ('Sales Person', 100000, 1),
    ('Sales Lead', 80000, 1),
    ('Lead Engineering', 105000, 2),
    ('Software Engineering', 90000, 2),
    ('Finance Lead', 85000, 3),
    ('Accounting', 95000, 3),
    ('Lawyer', 110000, 4),
    ('Lead Legal', 75000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
    ('Brayan', 'Palomino', 1, 4),
    ('Jaime', 'Aristizabal', 2, 3),
    ('Luz', 'Betancourth', 3, 2),
    ('Ana', 'Valencia', 4, 1),
    ('Alejandra', 'Alzate', 5, 4),
    ('Valeria', 'Garcia', 6, 3),
    ('Laura', 'Alvarez', 7, 2),
    ('Laura', 'Londono', 8, 1);