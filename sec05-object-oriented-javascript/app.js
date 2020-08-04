// The core of JavaScript's object-oriented programming lies within the constructor function 
// and the "this" keyword. Below is an example of using both:
function TaskItem(taskString, dueDate){
    // Note that this is the syntax for ES5

    // Use "this" to refer to the object itself and for assigning attributes; attributes can be primitive, objects, or
    // function
    this.taskString = taskString;
    this.dueDate = dueDate;
    this.computeDaysLeft = function(){
        // You can access attributes of the object itself
        const nMillSecLeft = this.dueDate - Date.now();
        const nDaysLeft = Math.floor(nMillSecLeft / (1000 * 60 * 60 * 24));
        return nDaysLeft
    }
}

const fileTax = new TaskItem("file tax!", new Date("07-15-2020"));


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Built-in constructors
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// In JavaScript there is a difference between primitive data types and objects. Many of primitive types have their own
// constructors, but using constructors defines a different object that behaves differently
const primitiveStr = "primitive string";
const strObj = new String("primitive string");
// The two variables are soft equal with ==, but not strict equal with ===:
function checkEquality(v1, v2){
    if(v1 === v2){
        console.log(`${v1.toString()} and ${v2.toString()} are strictly equal`);
    }else if(v1 == v2){
        console.log(`${v1.toString()} and ${v2.toString()} are not strictly equal, but generally equal`);
    }else{
        console.log(`${v1.toString()} and ${v2.toString()} are not strictly equal, nor generally equal`);
    }
}
checkEquality(primitiveStr, strObj);

// Similar stories with Number, Boolean, and the general Object class
checkEquality(1, new Number(1));
checkEquality(true, new Boolean(true));
checkEquality({taskString: "file tax"}, new Object({taskString: "file tax"}));
// Here is a really weird Function constructor:
const getSumFuncObj = new Function('x1', 'x2', 'return x1 + x2;');

// Arrays are different!
checkEquality(['1', '2', '3'], new Array('1', '2', '3'));

// One way using built-in object classes for primitive values is useful is that you can assign attributes to it:
strObj.toCamelbackCasing = function(){
    console.log(`I should be converting ${this.toString()} to camelBack casing, but I am too lazy`);
}
strObj.toCamelbackCasing();

// Otherwise, stay away from them!


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Prototype and inheritance 
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function User(username) {
    // Assign some attributes
    this.username = username;
    this.isActive = true;

    // Define some instance methods
    this.deactivate = function(){
        if(this.isActive){
            this.isActive = false;
        }else{
            console.log(`WARNING: User ${this.username} is already inactive`);
        }
    }
    this.activate = function(){
        if(this.isActive){
            console.log(`WARNING: USER ${this.username} is already active`);
        }else{
            this.isActive = false;
        }
    }
}

function RegularUser(username, paymentTier){
    User.call(this, username);
    this.paymentTier = paymentTier;
}

function AdminUser(username, privilegeLevel){
    User.call(this, username);
    this.privilegeLevel = privilegeLevel
}

// RegularUser and AdminUser will share instance attributes and instance methods that are defined in the User 
// constructor:
const adminBruce = new AdminUser('bruce_admin', "SUPERUSER");
const userBruce = new RegularUser('bruce', 'FREE');
adminBruce.deactivate();
userBruce.deactivate();

// Prototype in JavaScript is like "Class" in other Object-oriented programming languages; an object's prototype can be
// retrieved by the .__proto__ attribute. In particular, the .__proto__.constructor maps back to the constructor method:
console.log(adminBruce.__proto__);
if(adminBruce.__proto__.constructor === AdminUser){
    console.log(`"adminBruce.__proto__.constructor === AdminUser" evaluates to "true"`);
}

// Prototype is the basis on which inheritance is defined; without explicit definition, all constructors' prototypes
// directly inherit the Object prototype:
if(adminBruce.__proto__.__proto__.constructor === Object){
    console.log(`"adminBruce.__proto__.__proto__.constructor === Object" evaluates to "true"`);
}
// We can define explicit inheritance through prototypes:
AdminUser.prototype = Object.create(User.prototype);
AdminUser.prototype.constructor = AdminUser;
RegularUser.prototype = Object.create(User.prototype);
RegularUser.prototype.constructor = RegularUser;
const adminBetty = new AdminUser('betty_admin', "SUPERUSER");
const userBetty = new RegularUser('betty', 'FREE')
console.log(adminBetty.__proto__);

// Prototype can have functions attributed to it, which then becomes available to all objects:
AdminUser.prototype.toString = function(){
    return `[${this.privilegeLevel}]${this.username}`;
}
console.log(`${adminBetty}`);
