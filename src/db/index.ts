import {pool} from './connection.js'

export default class db{
constructor (){}

async query (sql: string, args: any[]= []){
    const client = await pool.connect();
    try{
        const result = await client.query(sql, args);
        return result;
    }
    finally{
        client.release();
    }
}

async findDepartments(){
    return this.query(
        'SELECT * FROM department ORDER BY department.id'
    );
}

async findManagers(){
    return this.query(
        'SELECT * FROM manager ORDER BY manager.id'
    );
}

async findRoles(){
    return this.query(
        'SELECT role.id, role.role_title AS "Role", role.salary AS "Salary" ,department.department_name AS "Department" FROM role JOIN department ON role.department_id = department.id'
    );
}

async findEmployees(){
    return this.query(
        'SELECT employee.id, employee.first_name AS "FirstName", employee.last_name AS "LastName", role.role_title AS "Role", manager.manager_name AS "Manager Name" FROM employee JOIN role ON employee.role_id = role.id JOIN manager ON employee.manager_id = manager.id ORDER BY employee.id'
    );
}
 
async createEmployee(employee:any){
    const {first_name, last_name, role_id, manager_id } = employee;
    return this.query(
        'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)',[first_name, last_name, role_id, manager_id]
    );
}

async createDepartment(department:string){
    return this.query(
        'INSERT INTO department (department_name) VALUES ($1)',[department]
    );
}

async createRole(role:any){
    const {role_title, salary, department_id } = role;
    return this.query(
        'INSERT INTO role (role_title, salary, department_id) VALUES ($1, $2, $3)',[role_title, salary, department_id]
    );
}

async createManager(manager:string){
    return this.query(
        'INSERT INTO manager (manager_name) VALUES ($1)',[manager]
    );
}

async updateEmployeeRole(employee:number, role:number){
    return this.query(
        'UPDATE employee SET role_id = ($1) WHERE id = ($2)',[role, employee]
    );
}

async updateEmployeeManager(employee:number, manager:number){
    return this.query(
        'UPDATE employee SET manager_id = ($1) WHERE id = ($2)',[manager, employee]
    );
}

async viewEmployeesByManager(){
    return this.query(
        'SELECT employee.id , employee.first_name AS "First Name", employee.last_name, role.role_title AS "Last Name", manager.manager_name AS "Manager Name" FROM employee JOIN role ON employee.role_id = role.id JOIN manager ON employee.manager_id = manager.id ORDER BY employee.manager_id '
    );
}

async viewEmployeesByDepartment(){
    return this.query(
        'SELECT e.first_name AS "First Name", e.last_name AS "Last Name", r.role_title AS "Role", r.salary AS "Salary", d.department_name AS "Department" FROM  employee e JOIN  role r ON e.role_id = r.id JOIN  department d ON r.department_id = d.id ORDER BY  d.department_name, e.last_name;'
    );
}
/*
async deleteDepartment(department:number){
    
    return this.query(
        'DELETE FROM department WHERE id = ($1)',[department]
    );
    console.log(this.query);
}*/

}