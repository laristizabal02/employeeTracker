DROP DATABASE IF EXISTS employees;
CREATE DATABASE employees;

\c employees;

CREATE TABLE department (
  id SERIAL PRIMARY KEY,
  department_name VARCHAR(30) UNIQUE NOT NULL
);

CREATE TABLE manager (
  id SERIAL PRIMARY KEY,
  manager_name VARCHAR(30) UNIQUE NOT NULL
);

CREATE TABLE role (
  id SERIAL PRIMARY KEY,
  role_title VARCHAR(30) UNIQUE NOT NULL,
  salary DECIMAL NOT NULL,
  department_id INTEGER NOT NULL,
  FOREIGN KEY (department_id) REFERENCES department(id) 
);

CREATE TABLE employee (
  id SERIAL PRIMARY KEY,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INTEGER ,
  manager_id INTEGER,
  FOREIGN KEY (role_id) REFERENCES role(id) ,
  FOREIGN KEY (manager_id) REFERENCES manager(id)
);
