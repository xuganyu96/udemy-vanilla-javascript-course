/* 
With ES6/ES2015, object oriented programming becomes easy and just like other object-oriented programming languages.
However, note that ES6 only provides syntactical change; the prototypal model remains unchanged between ES6 and earlier
engines, so the .prototype stuff is still all valid
*/
const usersList = [];
class User {
    // This replaces the original constructor function
    constructor(username, userFirstName, userLastName){
        this.username = username;
        this.profile = {
            firstName: userFirstName,
            lastName: userLastName
        }
        this.createdOn = new Date(Date.now());
        usersList.push(this);
    }

    // functions defined here are attached to the prototype and not the object itself.
    // In the example below, if you run superman.hasOwnProperty("getFullName"), you will get False
    getFullName(){
        return `${this.userFirstName} ${this.userLastName}`;
    }

    toString(){
        return this.username
    }

    // Use "static" keyword to associate the function with the class and not the object; 
    // In the example below, superman.checkUsername('xxx') will cause an error
    static usernameTaken(username){
        let isTaken = false;
        usersList.forEach(function(value){
            if(value.username === username){
                isTaken = true;
            }
        })

        return isTaken
    }
}

class AdminUser extends User {
    constructor(username, userFirstName, userLastName){
        super(username, userFirstName, userLastName);

        this.privilegeLevel = 0;
    }

    promote(){
        this.privilegeLevel++;
    }

    demote(){
        if(this.privilegeLevel > 0){
            this.privilegeLevel--;
        }
    }

    // Overwrite a super class' method
    toString(){
        return `[ADMIN]${this.username}`
    }
}

// Here is an example
const superman = new User("superman", "Clark", "Kent");
const batman = new AdminUser("batman", "Bruce", "Wayne");
// You can confirm that batman.__proto__ is exactly User.prototype, 
// but batman.__proto__.constructor is AdminUser.prototype.constructor, just like how we did with ES5

