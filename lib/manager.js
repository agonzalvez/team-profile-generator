//extends from employee so we have to require

const Employee = require('./employee');

//the class extends thru employee
// in the constructor we set the parameters including officenumber since we want to grab that for the manager position
class Manager extends Employee{
    constructor(name, id, email, officeNumber){
        super(name, id, email);
    
        this.officeNumber = officeNumber;
    }

    //this method grabs officenumber and returns it
    getOfficeNumber() {
        return this.officeNumber;
    }
    //this method grabs the position and returns it as manager
    getPosition(){
        return "Manager";
    }
}

//exports module so that we can use it
module.exports = Manager