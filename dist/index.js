import inquirer from 'inquirer';
import Db from './db/index.js';
const db = new Db();
mainPromps();
function mainPromps() {
    inquirer.prompt([
        {
            type: 'list',
            name: 'choice',
            message: 'Welcome!! what do you want to do?: ',
            choices: [
                {
                    name: 'View all Deparments',
                    value: 'view_departments',
                },
                {
                    name: 'View all Roles',
                    value: 'view_roles',
                },
                {
                    name: 'View all Employees',
                    value: 'view_employees',
                },
                {
                    name: 'View all Managers',
                    value: 'view_manager',
                },
                {
                    name: 'Add an Employee',
                    value: 'add_employee',
                },
                {
                    name: 'Add a Department',
                    value: 'add_deparment',
                },
                {
                    name: 'Add a Role',
                    value: 'add_role',
                },
                {
                    name: 'Add a Manager',
                    value: 'add_manager',
                },
                {
                    name: 'Update Employee\'s Role',
                    value: 'update_employeeRole',
                },
                {
                    name: 'Update Employee\'s Manager',
                    value: 'update_employeeManager',
                },
                {
                    name: 'View employees by Manager',
                    value: 'view_employees_by_manager',
                },
                {
                    name: 'View employees by Deparment',
                    value: 'view_employees_by_department',
                },
                /*{
                    name: 'Delete Department',
                    value: 'delete_department',
                },*/
                {
                    name: 'QUIT',
                    value: 'quit',
                }
            ]
        }
    ]).then((res) => {
        const choice = res.choice;
        switch (choice) {
            case 'view_departments':
                view_departments();
                break;
            case 'view_roles':
                view_roles();
                break;
            case 'view_employees':
                view_employees();
                break;
            case 'view_manager':
                view_managers();
                break;
            case 'add_employee':
                add_employee();
                break;
            case 'add_deparment':
                add_deparment();
                break;
            case 'add_role':
                add_role();
                break;
            case 'add_manager':
                add_manager();
                break;
            case 'update_employeeRole':
                update_employeeRole();
                break;
            case 'update_employeeManager':
                update_employeeManager();
                break;
            case 'view_employees_by_manager':
                view_employees_by_manager();
                break;
            case 'view_employees_by_department':
                view_employees_by_department();
                break;
            /* case 'delete_department':
             delete_department();
             break;*/
            case 'quit':
                console.log("Thanks! have a great day!");
                process.exit();
                break;
        }
    });
}
function view_departments() {
    db.findDepartments()
        .then(({ rows }) => {
        const departments = rows;
        console.log('\n');
        console.table(departments);
    })
        .then(() => mainPromps());
}
function view_roles() {
    db.findRoles()
        .then(({ rows }) => {
        const roles = rows;
        console.log('\n');
        console.table(roles);
    })
        .then(() => mainPromps());
}
function view_employees() {
    db.findEmployees()
        .then(({ rows }) => {
        const employees = rows;
        console.log('\n');
        console.table(employees);
    })
        .then(() => mainPromps());
}
function view_managers() {
    db.findManagers()
        .then(({ rows }) => {
        const employees = rows;
        console.log('\n');
        console.table(employees);
    })
        .then(() => mainPromps());
}
function add_employee() {
    Promise.all([db.findRoles(), db.findManagers()])
        .then(([rolesResult, managersResult]) => {
        const roles = rolesResult.rows;
        const managers = managersResult.rows;
        // Prompt user for employee details
        return inquirer.prompt([
            {
                type: 'input',
                name: 'first_name',
                message: 'Enter the first name of the employee:'
            },
            {
                type: 'input',
                name: 'last_name',
                message: 'Enter the last name of the employee:'
            },
            {
                type: 'list',
                name: 'role_id',
                message: 'Select the employee\'s role:',
                choices: roles.map(role => ({
                    name: role.Role, // Role title will be displayed
                    value: role.id // Use role id for saving
                }))
            },
            {
                type: 'list',
                name: 'manager_id',
                message: 'Select the employee\'s manager:',
                choices: managers.map(manager => ({
                    name: manager.manager_name, // Manager's full name
                    value: manager.id // Use manager id for saving
                }))
            }
        ]);
    })
        .then(employee => {
        // Send the employee details to the createEmployee function
        return db.createEmployee(employee);
    })
        .then(() => {
        console.log('Employee added successfully!');
    })
        .then(() => mainPromps()) // Return to the main prompts
        .catch(err => {
        console.error('Error adding employee:', err);
        mainPromps();
    });
}
function add_deparment() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'department_name',
            message: 'Enter the name of the new department:'
        }
    ]).then((res) => {
        const { department_name } = res;
        // Insert the new department into the database
        db.createDepartment(department_name)
            .then(() => {
            console.log(`Department "${department_name}" added successfully!`);
        })
            .then(() => mainPromps()) // Return to the main prompts
            .catch((err) => {
            console.error('Error adding department:', err);
            mainPromps(); // Return to the main prompts in case of error
        });
    });
}
function add_role() {
    Promise.all([db.findDepartments()])
        .then(([departmentsResult]) => {
        const departments = departmentsResult.rows;
        // Prompt user for employee details
        return inquirer.prompt([
            {
                type: 'input',
                name: 'role_title',
                message: 'Enter the name of the role:'
            },
            {
                type: 'input',
                name: 'salary',
                message: 'Enter the salary of the role'
            },
            {
                type: 'list',
                name: 'department_id',
                message: 'Select the role\'s deparment:',
                choices: departments.map(department => ({
                    name: department.department_name,
                    value: department.id
                }))
            },
        ]);
    })
        .then(role => {
        // Send the employee details to the createEmployee function
        return db.createRole(role);
    })
        .then(() => {
        console.log(`Role added successfully!`);
    })
        .then(() => mainPromps()) // Return to the main prompts
        .catch(err => {
        console.error('Error adding role:', err);
        mainPromps();
    });
}
function add_manager() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'manager_name',
            message: 'Enter the name of the new Manager:'
        }
    ]).then((res) => {
        const { manager_name } = res;
        db.createManager(manager_name)
            .then(() => {
            console.log(`Manager "${manager_name}" added successfully!`);
        })
            .then(() => mainPromps()) // Return to the main prompts
            .catch((err) => {
            console.error('Error adding manager:', err);
            mainPromps(); // Return to the main prompts in case of error
        });
    });
}
function update_employeeRole() {
    Promise.all([db.findEmployees(), db.findRoles()])
        .then(([employeeResult, rolesResult]) => {
        const roles = rolesResult.rows;
        const employees = employeeResult.rows;
        // Prompt user for employee details
        return inquirer.prompt([
            {
                type: 'list',
                name: 'employee_id',
                message: 'Which Employee do you want to update?:',
                choices: employees.map(employee => ({
                    name: `${employee.FirstName} ${employee.LastName}`,
                    value: employee.id // Use role id for saving
                }))
            },
            {
                type: 'list',
                name: 'role_id',
                message: 'Which role do you want to assign the selected employee?:',
                choices: roles.map(role => ({
                    name: role.Role, // Role title will be displayed
                    value: role.id // Use role id for saving
                }))
            },
        ]);
    })
        .then(answers => {
        const { employee_id, role_id } = answers;
        return db.updateEmployeeRole(employee_id, role_id);
    })
        .then(() => {
        console.log('Employee role updated successfully!');
    })
        .then(() => mainPromps())
        .catch(err => {
        console.error('Error updating employee:', err);
        mainPromps();
    });
}
function update_employeeManager() {
    Promise.all([db.findEmployees(), db.findManagers()])
        .then(([employeeResult, managerResult]) => {
        const managers = managerResult.rows;
        const employees = employeeResult.rows;
        // Prompt user for employee details
        return inquirer.prompt([
            {
                type: 'list',
                name: 'employee_id',
                message: 'Which Employee do you want to update?:',
                choices: employees.map(employee => ({
                    name: `${employee.FirstName} ${employee.LastName}`,
                    value: employee.id
                }))
            },
            {
                type: 'list',
                name: 'manager_id',
                message: 'Which Manager do you want to assign the selected employee?:',
                choices: managers.map(manager => ({
                    name: manager.manager_name,
                    value: manager.id
                }))
            },
        ]);
    })
        .then(answers => {
        const { employee_id, manager_id } = answers;
        return db.updateEmployeeManager(employee_id, manager_id);
    })
        .then(() => {
        console.log('Employee manager updated successfully!');
    })
        .then(() => mainPromps())
        .catch(err => {
        console.error('Error updating employee:', err);
        mainPromps();
    });
}
function view_employees_by_manager() {
    db.viewEmployeesByManager()
        .then(({ rows }) => {
        const employees = rows;
        console.log('\n');
        console.table(employees);
    })
        .then(() => mainPromps());
}
function view_employees_by_department() {
    db.viewEmployeesByDepartment()
        .then(({ rows }) => {
        const employees = rows;
        console.log('\n');
        console.table(employees);
    })
        .then(() => mainPromps());
}
/*
function delete_department(){
    Promise.all([db.findDepartments()])
        .then(([ departmentResult]) => {
            const departments = departmentResult.rows;

            
            return inquirer.prompt([
                {
                    type: 'list',
                    name: 'department_id',
                    message: 'Which department do you want to delete?:',
                    choices: departments.map(department => ({
                        name: `${department.department_name} `,
                        value: department.id
                    }))
                },
                
            ]);
        })
        .then(answers => {
            const {department_id} = answers;

            return db.deleteDepartment(department_id);
        })
        .then(() => {
            console.log('select Department has been deleted!');
        })
        .then(() => mainPromps())
        .catch(err => {
            console.error('Error deleting department:', err);
            mainPromps();
        });
}*/ 
