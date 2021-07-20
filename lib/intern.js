//extends thru employee so we have to require it 
const Employee = require('./employee');

//Intern extends thru employee
//and super accesses the parents properties in Employee 
class Intern extends Employee {
    constructor(name, id, email, school) {
        super(name, id, email);

        this.school = school;
    }
    //this method allows school to be returned
    getSchool() {
        return this.school;
    }
    //this method returns Intern for position
    getPosition(){
        return "Intern";
    }
}

//exports the module so we can use it later
module.exports = Intern;