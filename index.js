//require files we will be needing 

//fs is for writing the file
const fs = require('fs');

//inquirer so that it will ask questions 
const inquirer = require('inquirer');
// we need these constructors
const Engineer = require('./lib/engineer');
const Manager = require('./lib/manager');
const Intern = require('./lib/intern');

const team = [];

//function to start questions and start to generate html
function init() {
    startGenhtml();
    addMember();
}

//this function handles the questions that the user will be prompted with
function addMember(){
    inquirer.prompt([{
        //
            type: 'input',
            name: 'name',
            message: "What is the team member's name?"
        },
        {
            type: "list",
            message: "What is the team member's role?",
            choices: ["Engineer", "Intern", "Manager"],
            name: 'position'
        },
        {
            type: 'input',
            message: "What is team member's id?",
            name: 'id',
        },
        {
            type: 'input',
            message: "What is team member's email?",
            name: 'email',
        }])
        //after these series of question are ran .then allows this code to be exectued 
        //IF Engineer is the position it will ask for github username
        //ELSE if position is set to manager it will ask for office number
        //else it will ask for school number since Intern is the only position left 
    .then(function({name, position, id, email}) {
        let positionInfo = '';
        if (position === 'Engineer'){
            positionInfo = 'Github username';
        } else if (position === 'Manager'){
            positionInfo = 'Office number';
        } else {
            positionInfo = 'School name';
        }
        inquirer.prompt([{
            type: 'input',
            name: 'positionInfo',
            message: "What is team member's ${positionInfo}",
        },
        {
            type: 'list',
            message: "Continue adding team member's?",
            choices: [
                'yes',
                'no'
            ],
            name:'moreMembers'
        }])
        //after being asked if they want to add more members this .then will allow more members to be added 
        //and sets if else statements that will allow member to be constructed
        .then(function({positionInfo, moreMembers}) {
            let newMember;
            if ( position === 'Engineer') { 
                newMember = new Engineer (name, id, email, positionInfo);    
            } else if (position === 'Intern') {
                newMember = new Intern (name, id, email, positionInfo);
            } else {
                newMember = new Manager (name, id, email, positionInfo);
            }
            //pushes the newMember into team
            team.push(newMember);
            //the addhtml will take in the parameter newMmeber
            addHtml(newMember)
            //this .then allows user to add more members else it will run the function finishHTML
            .then(function() {
                if (moreMembers === 'yes') {
                    addMember();
                } else {
                    finishHtml();
                }
            });
        });

    });

};

//this function starts to generates html so adding in the top of html without any user input yet
function startGenhtml(){
    const html = `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" />
        <link rel="stylesheet" href="style.css" />
        <title>Employee Tracker</title>
    </head>
    <header>
        <h1> Team Generator</h1>
    </header>
    <body>
        <main>
            <br>
            <br>
            <div class="row">
                <div class="column">`;
    fs.writeFile('./dist/log.html', html, function(err) {
        if (err){
            console.log(err);
        }
    });
    console.log('start');
}//fs writes to the file sets the path the type of file and if there is an error it will console log it

//this function adds the HTML with the member parameter and returns new promise 
function addHtml(member){
    return new Promise(function(resolve, reject) {
        //will allow the methods to be grabbed for the member and set them equal to a const
        const name = member.getName();
        const position = member.getPosition();
        const id = member.getId();
        const email = member.getEmail();
        let data = "";

        //this is saying if position is Engineer it will grab the members github and the data will add this template code and Add it to html
        if (position === 'Engineer'){
            const gitHub = member.getGithub();
            data = `<div class="col-6">
            <div class="cardcard mx-auto mb-3" style="width: 18rem">
            <h5 class="card-header">${name}<br /><br />Engineer</h5>
            <ul class="list-group list-group-flush">
                <li class="list-group-item">ID: ${id}</li>
                <li class="list-group-item">Email Address: ${email}</li>
                <li class="list-group-item">GitHub: ${gitHub}</li>
            </ul>
            </div>
        </div>`;
        //this is saying if position is Intern it will grab the members school and the data will add this template code and Add it to html
        } else if (position === 'Intern'){
            const school = member.getSchool();
            data = `<div class="col-6">
            <div class="card mx-auto mb-3" style="width: 18rem">
            <h5 class="card-header">${name}<br /><br />Intern</h5>
            <ul class="list-group list-group-flush">
                <li class="list-group-item">ID: ${id}</li>
                <li class="list-group-item">Email Address: ${email}</li>
                <li class="list-group-item">School: ${school}</li>
            </ul>
            </div>
        </div>`;
        } else {
        ////this is saying else any other position it will grab the members office number data will add this to the letDATA
            const officePhone = member.getOfficeNumber();
            data = `<div class="col-6">
            <div class="card mx-auto mb-3" style="width: 18rem">
            <h5 class="card-header">${name}<br /><br />Manager</h5>
            <ul class="list-group list-group-flush">
                <li class="list-group-item">ID: ${id}</li>
                <li class="list-group-item">Email Address: ${email}</li>
                <li class="list-group-item">Office Phone: ${officePhone}</li>
            </ul>
            </div>
        </div>`
        }
        // console.log('new team member added');
        fs.appendFile("./dist/log.html", data, function (err) {
            if (err) {
                return reject(err);
            };
            return resolve();
    });
});
}
//this is set to finsish the HTML so that if a user does not want to add anymore members it will finsih the html and close it 
function finishHtml() {
    const html = ` </div>
    </div>
    
</body>
</html>`;
//this appends to the file log.html 
    fs.appendFile("./dist/log.html", html, function (err) {
        if (err) {
            console.log(err);
        };
    });
    console.log("end");
}

//this calls the function init which starts the series of questions and starts to generate HTML
init();