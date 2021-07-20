//it extends from employee so we have to require it
const Employee = require('./employee');

//setting the class and extending it thru employee constructor
//parameters included github too since we want to grab that from them
class Engineer extends Employee {
    constructor(name, id, email, github) {
        //super refers to the parent class employee and access's their properties
        super(name, id, email);

        this.github = github;
    }
    //we add this method so we can return github
    getGithub() {
        return this.github;
    }

    getPosition() {
        return "Engineer";
    }
}
//exports the model so we can use it later
module.exports = Engineer;