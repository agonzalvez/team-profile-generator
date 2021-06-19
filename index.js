const fs = require('fs');
const inquirer = require("inquirer");
const Manager = require("./lib/manager");
const Engineer = require("./lib/engineer");
const Intern = require("./lib/intern");
const teams = []


inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "What is the Manager's name?"
        },
        {
            type: "input",
            name: "email",
            message: "What is your email?"
        },
        {
            type: "input",
            name: "special",
            message: "What is the contact number?"
        },
        {
            type: "input",
            name: "id",
            message: "What is the worker's id?"
        }
    ])

    .then((answer) => {
        let manager = new Manager(answer.name, answer.id, answer.email, answer.special);
        teams.push(manager);
        anotherOne();
    });

function writeToFile(fileName, data) {
    fs.writeFile(fileName, data, (err) =>
        err ? console.error(err) : console.log('Success!'))
}

function additionalEntry() {
    inquirer.prompt([

        {
            type: "checkbox",
            name: "repeat",
            message: "Would you like to add another employee?",
            choices: ["Engineer", "Intern", "None"]
        }
    ])
        .then((answer) => {
            if (answer.repeat.toString() == "None") {
                let storedCards = "";
                teams.forEach(element => {
                    storedCards += generateCards(element)

                });
                writeToFile("index.html", generateHTML(storedCards));

            } else if (answer.repeat.toString() == "Engineer") {
                inquirer.prompt([
                    {
                        type: "input",
                        name: "name",
                        message: "What is the Engineer's name?"
                    },
                    {
                        type: "input",
                        name: "email",
                        message: "What is your email?"
                    },
                    {
                        type: "input",
                        name: "id",
                        message: "What is the worker's id?"
                    },
                    {
                        type: "input",
                        name: "special",
                        message: "What is your GitHub username?"
                    },
                ])
                    .then((answer) => {
                        let engineer = new Engineer(answer.name, answer.id, answer.email, answer.special)
                        teams.push(engineer);
                        additionalEntry();
                    })
            } else {
                inquirer.prompt([
                    {
                        type: "input",
                        name: "name",
                        message: "What is the Intern's name?"
                    },
                    {
                        type: "input",
                        name: "email",
                        message: "What is your email?"
                    },
                    {
                        type: "input",
                        name: "id",
                        message: "What is the worker's id?"
                    },
                    {
                        type: "input",
                        name: "special",
                        message: "Where did you attend school?"
                    },
                ])
                    .then((answer) => {
                        let intern = new Intern(answer.name, answer.id, answer.email, answer.special)
                        teams.push(intern);
                        additionalEntry();
                    })
            }
        })
}


// inquirer asks for manager info

//  ask if user wishes to fill out employee positions
    // if no, end inquirer and load HTML with fs
    // if intern, user inquirer intern question set
    // if engineer, user inquirer engineer question set
    // after question, ask if they want to add another employee

// .then 
    // take answers
    // pass content into the template
    // pass template into fs