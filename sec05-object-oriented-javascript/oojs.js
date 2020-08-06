// Prototype-based language

// JavaScript is known as a prototype-based language, which is different from class-based language like Python and Java
/*
Prototype-based language achieves inheritance using the prototype object that was assigned to the .__proto__ property
of an object. A prototype object also has a "__proto__" property is another prototype object, hence the concept of a 
prototype chain.

Let's begin by defining a constructor function and examining the prototypes of the object(s) instantiated by the 
constructor:
*/
function User(username, userFirstName, userLastName){
    this.username = username;
    this.profile = {
        firstName: userFirstName,
        lastName: userLastName
    }

    this.getFullName = function(){
        return `${this.profile.lastName}, ${this.profile.firstName}`;
    }
}

const bruce = new User("bruce", "Bruce", "Lee");
console.log(bruce.__proto__);
console.log(bruce.__proto__.__proto__);
if(bruce.__proto__ === User.prototype){
    console.log(`bruce.__proto__ is exactly User.prototype`);
}

/*
In the example above we have established the following prototype chain:
bruce inherits from the "User" prototype; "User" prototype inherits from the Object prototype
Note that by XXX prototype, we mean a prototype object whose "constructor" property is exactly the XXX function

Now let's explore the things that are inherited. First observe that through User, the only properties and methods 
defined are username, profile, and getFullName; however, the bruce instance also has access to methods under the 
Object prototype like "valueOf" and "toString", but not other, like "is" or "keys". The answer to the question "What are
the things that are inherited" is that methods of the prototype object are, while methods of the object itself are not
*/
if(bruce.valueOf === Object.valueOf){
    console.log(`bruce.valueOf is inherited from Object.valueOf`);
}
if(bruce.keys !== Object.keys){
    console.log(`bruce.keys is not inherited from Object.keys`);
}

/*
Big surprise! Anything can be a prototype object. In the example below, bruce2's prototype is bruce, so
bruce2 inherits all of bruce's properties and methods
*/
const bruce2 = Object.create(bruce);
if(bruce2.__proto__ === bruce){
    console.log(`bruce2's prototype is exactly bruce`);
}
if(bruce2.getFullName === bruce2.__proto__.getFullName){
    console.log(`bruce2.getFullName is exactly bruce2.__proto__.getFullName`);
}

/*
Now let's talk about inheritance and specifically, how to define that objects from one constructor inherit other 
prototypes.

To understand, we first need to make a distinction between properties/methods defined within the constructor, and those 
defined on the constructor's prototype:
*/
User.prototype.isActive = true;
User.prototype.activate = function(){this.isActive = true};
User.prototype.deactivate = function(){this.isActive = false};
john = new User("john", "John", "Doe");
if(!john.hasOwnProperty("activate")){
    console.log("activate is defined through prototype, thus not the object's property");
}
if(!john.hasOwnProperty("isActive")){
    console.log("isActive is defined through prototype, thus not the object's property");
}
if(john.hasOwnProperty("getFullName")){
    console.log("getFullName is defined through constructor, so it is the object's property");
}

// Now that we have made the distinction, it makes sense that inheriting properties defined within the constructor is
// distinct from inheriting properties defined.
function AdminUser(username, adminFirstName, adminLastName){
    // Use the syntax below to herit properties/methods defined through the constructor
    User.call(this, username, adminFirstName, adminLastName);

    this.privilege = 0;
    this.promote = function(){this.privilege++};
    this.demote = function(){
        if(this.privilege > 0){
            this.privilege--;
        }
    };
}
const superman = new AdminUser('superman', "Clark", "Kent");
if(superman.isActive === undefined){
    console.log(`superman has no access to "isActive"`);
}
// Note that at this moment, admin has no access to the "isActive", "activate", and "deactiavte" properties because 
// they are not defined in the constructor; to gain such access, we need to declare that AdminUser.prototype is 
// User.prototype:
AdminUser.prototype = Object.create(User.prototype);
const batman = new AdminUser("batman", "Bruce", "Wayne");
if(batman.isActive !== undefined){
    console.log(`batman has access to "isActive"`);
}
// However, directly changing AdminUser.prototype to User.prototype will overwrite AdminUser.prototype.constructor, so
// we need to manually assign it back:
AdminUser.prototype.constructor = AdminUser;

// THe last topic for OOJS is to overwrite AdminUser objects' getFullName() method
AdminUser.prototype.getFullName = function(){
    return `[ADMIN]${this.profile.lastName}, ${this.profile.firstName}`;
}
const wonderWoman = new AdminUser("wonder_woman", "Diana", "Prince");
console.log(wonderWoman.getFullName());
// I want the line above to print "[ADMIN]Prince, Diana", but it actually prints "Prince, Diana"
