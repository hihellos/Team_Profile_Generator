const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

// Use inquirer to gather information about the development team members, and create objects for each team member (using the correct classes as blueprints!)

const employeesArr = [];

function promptUser() {
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
            message: "Please select this employee's role: ",
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
        }
    ]).then(function(content) {
        console.log(content);
    });
};

promptUser()
    // .then(function(content) {
    //     console.log("This is our employee: ", content);
    // });

// .then(function(managerAnswer) {
//     const addManager = new Manager(
//         answers.name, 
//         answers.id, 
//         answers.email, 
//         managerAnswer.officeNumber);

//     employeesArr.push(addManager);
//     addEmployee();
// })

// const addEmployee = () =>

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// Manager: Enter your ID number: Enter your email: Enter your office number:
// Engineer: What is this engineer's name: What is this engineer's id: What is this engineer's email: What is this engineer's github username:
// Intern: What is this intern's name: What is this intern's id: What is this intern's email: What is this intern's school:

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer, and Intern classes should all extend from a class named Employee; see the directions for further information. Be sure to test out each class and verify it generates an object with the correct structure and methods. This structure will be crucial in order for the provided `render` function to work! ```
