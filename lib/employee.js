//this is where employee constructor will go

//constructs employees and sets paramaters equal to name, id, email, and poistion
class Employee {
    constructor(name, id, email){
        this.name = name;
        this.id = id;
        this.email = email;
    }
    //add method to get name and return it
    getName(){
        return this.name;
    }
    //add method to get ID and return the id
    getId(){
        return this.id;
    }
    //this method returns the email
    getEmail(){
        return this.email;
    }
    getPosition(){
        return "Employee";
    }
}

//export this module every is constructed w employee classconst
module.exports = Employee