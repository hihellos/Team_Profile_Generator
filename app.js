const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

// Use inquirer to gather information about team members 

const employees = [];

const promptUser = () => { // getting used to arrow functions
    return inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "Please enter the employee's name: "
        },
        {
            type: "input",
            name: "id",
            message: "Please input the employee ID: ",
        },
        {
            type: "input",
            name: "email",
            message: "Please enter employee's email: "
        },
        {
            type: "list",
            name: "role",
            message: "Please select content employee's role: ",
            choices: ["Manager", "Engineer", "Intern"]
        },
        // depending on role selected, continue prompts respective of selection 
        {
            type: "input",
            name: "officeNumber",
            message: "Please enter manager office number: ",
            when: (answer) => answer.role === "Manager"
        },
        {
            type: "input",
            name: "github",
            message: "Please enter employee github username: ",
            when: (answer) => answer.role === "Engineer"
        },
        {
            type: "input",
            name: "school",
            message: "Please enter intern school name: ",
            when: (answer) => answer.role === "Intern"
        },
    ]).then(function(content) {
        console.log(content);
        addEmployee();
        // create objects for each team member (using the correct classes as blueprints!)

        switch(content.role) {
            case "Manager":
                const addManager = new Manager(
                    content.name,
                    content.id,
                    content.email,
                    content.officeNumber,
                )
                employees.push(addManager);
            break;
            case "Engineer":
                const addEngineer = new Engineer(
                    content.name,
                    content.id,
                    content.email,
                    content.github,
                )
                employees.push(addEngineer);
            break;
            case "Intern":
                const addIntern = new Intern(
                    content.name,
                    content.id,
                    content.email,
                    content.school,
                )
                employees.push(addIntern);
            break;
        }
    });
};

const addEmployee = () => {
    inquirer.prompt(
        {
            type: "confirm",
            name: "add",
            message: "Do you want to add another employee? ",
        }
    ).then(function(answer) {
        if (answer.add === true) {
            promptUser();
        }
        // After the user has input all employees desired, call the `render` function (required above) and pass in an array containing all employee objects
        else {
            fs.writeFile(outputPath, render(employees), function(err) {
                if (err) {
                    return console.log(err);
                }
                console.log("Successfully added employees to team!");
                console.log("Our team: ", employees);
            })
        }
    })
}

promptUser();
