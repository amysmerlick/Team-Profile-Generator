const inquirer = require('inquirer');
const fs = require('fs');
const Employee = require("./lib/Employee")
const Manager = require("./lib/Manager")
const Engineer = require("./lib/Engineer")
const Intern = require("./lib/Intern")

const team = []
const askManager = () => (
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'managerName',
                message: 'What is your name?',
            },
            {
                type: 'input',
                name: 'id',
                message: 'What is your ID?',
            },
            {
                type: 'input',
                name: 'email',
                message: 'What is your email?',
            },
            {
                type: 'input',
                name: 'officeNumber',
                message: 'What is your office number?',
            },
        ]).then(function (answers) {
            console.log(answers);
            const manager = new Manager(answers.managerName, answers.id, answers.email, answers.officeNumber);
            team.push(manager)
            init()
        })
)
const askEngineer = () => (
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'engineerName',
                message: 'What is your name?',
            },
            {
                type: 'input',
                name: 'id',
                message: 'What is your ID?',
            },
            {
                type: 'input',
                name: 'email',
                message: 'What is your email?',
            },
            {
                type: 'input',
                name: 'github',
                message: 'What is your github?',
            },
        ]).then(function (answers) {
            console.log(answers);
            const engineer = new Engineer(answers.engineerName, answers.id, answers.email, answers.github);
            team.push(engineer)
            init()
        })
)

const askIntern = () => (
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'internName',
                message: 'What is your name?',
            },
            {
                type: 'input',
                name: 'id',
                message: 'What is your ID?',
            },
            {
                type: 'input',
                name: 'email',
                message: 'What is your email?',
            },
            {
                type: 'input',
                name: 'school',
                message: 'What is your school?',
            },
        ]).then(function (answers) {
            console.log(answers);
            const intern = new Intern (answers.internName, answers.id, answers.email, answers.school);
            team.push(intern)
            init()
        })
)



const generateTeam = () => {
    console.log(team);
    let cards = ""
    for (let index = 0; index < team.length; index++) {
        const element = team[index];
        const roleName = element.getRole()
        cards+=`<div class = "col-4"> <div class="card text-white bg-dark mb-3" style="max-width: 18rem;">
        <div class="card-header">${roleName}</div>
        <div class="card-body">
          <h5 class="card-title">Name: ${element.name}</h5>
          <p class="card-text">ID: ${element.id}</p>
          <p class="card-text">Email: <a href="mailto:${element.email}">${element.email}</a></p>
          <p class="card-text">${element.officeNumber ? `Office Number: ${element.officeNumber}` : ""}</p>
          <p class="card-text">${element.github ? `Github: <a href="https://www.github.com/${element.github}">${element.github}</a>` : ""}</p>
          <p class="card-text">${element.school ? `School: ${element.school}` : ""}</p>
        </div>
      </div></div>`
        
    }
    const filename = `output/index.html`;
    const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
    <title>Chris Lyons' Team Profile Generator</title>
</head>
<body>
<nav class="navbar navbar-light bg-danger">
<span class="navbar-brand mb-0 h1 text-light">My Team</span>
</nav>
<div class="container mt-4">
  <div class="row">
   
        ${cards}
    </div>
  </div>
</div>
</body>
</html>`

    fs.writeFile(filename, html, (err) =>
        err ? console.log(err) : console.log('Success!')
    );

};

function init() {
    inquirer
        .prompt([
            {
                type: 'list',
                name: 'switch',
                message: 'Welcome, what type of employee would you like to add?',
                choices: ["Manager", "Engineer", "Intern", "Generate Team"]
            },
        ]).then(answers => {

            switch (answers.switch) {
                case "Manager":
                    askManager()
                    break;
                case "Engineer":
                    askEngineer()
                    break;
                case "Intern":
                    askIntern()
                    break;
                case "Generate Team":
                    generateTeam()
                    break;
                default:
                // code block
            }
        })
}
init()

const managerArray = team.filter(employee => employee.getRole() === "Manager")