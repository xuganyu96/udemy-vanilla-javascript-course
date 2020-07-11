// Let's begin by saying hello to the world
console.log("Hello World");

/* 
VARIABLES:
    there are three keywords for assigning values to variable names:
    -   var
        the most generic way; not recommended unless compatibility with older browser is a concern
    -   let
        declares that a variable name is reserved, and assigns a value to it if a value if supplied; otherwise, the 
        variable name will be "undefined".
    -   const
        declares a variable and assign it a value that cannot be changed; a constant variable must be supplied a value
        at declaration, and trying to change it afterwards will cause error to be raised
*/

/*
DATA TYPES
    There are two major kinds of data types: primitive types and reference types. 
    Primitive types include the following:
        -   numbers
            this includes integers and floats
        -   String
        -   boolean
        -   null
        -   undefined
        -   Symbol(), as of ES2015
    All others are considered reference types since the variable's memory address does not directly correspond to the 
    value itself.
    Use the "typeof" keyword to print the type as a String
*/
three = 3;
pointOne = 0.1;
fullName = {'firstName': "Bruce", "lastName": 'Xu'};
aList = [true, 2, "Three"];
// Cool way to print out a table in console
console.table(fullName);
// A variable does not have to be given values at instantiation; if nothing is given, the variable defaults to 
// "undefined"
var nothing;
console.log(nothing);

// With ES2015, there are two more ways of variable assignment:
// "let" works largely the same with var; the differences will be explained in later sections;
// "const" works similar to FINAL in Java: "const" variables can only be assigned one, and cannot be 
// uninstantiated
let hisName = "Leo";
const PI = 3.1415926535;
// Tryign to reassign a const variable will cause errors
try {
    PI = 4;
}
catch(error) {
    console.log(error);
}

// Let's talk about data types; like Python JavaScript has primitive types and reference types;
// You can inspect the type of the data using "typeof", which evaluates to a string
console.log(typeof "John Doe");
console.log(typeof true);
console.log(typeof 1);
console.log(typeof null);
let something_undefined;
console.log(something_undefined);
console.log(Symbol())
console.log(typeof (typeof "John Doe"));

// Then there are the reference types, they include arrays, dictionaries, and custom defined classes
console.log(typeof ['one', 'two', 'three']);
console.log(typeof {
    city: "San Jose",
    county: "Santa Clara"
});
console.log(typeof new Date());

// Type conversion to String
function id_typeof(x) {
    console.log(x, typeof x);
}
id_typeof(5);
id_typeof("5");
id_typeof(true);
id_typeof(new Date());
id_typeof(["one", "two", "three"])
id_typeof(String(5));
id_typeof(String(true));
id_typeof(String(new Date()));
id_typeof(String(["one", "two", "three"]))
// Objects and primitives can implement instance method toString, similar to .__str__() in python
id_typeof((5).toString());

// Type conversion to Number
id_typeof(Number("5"));
id_typeof(Number(true));
id_typeof(Number(false));
id_typeof(Number(null));
id_typeof(Number("null")); // This will be parsed to NaN
id_typeof(parseInt(null)); // This will be parsed to NaN
id_typeof(parseFloat(null)); // This will be parsed to NaN
id_typeof(parseInt(100.3)); // This will be parsed to 100
id_typeof(parseFloat(100.3)); // This will be parsed to 100.3

// Type coercion!
id_typeof(1 + "1")

// There are two types of equality comparison: == and ===
// == compares evaluation, while === compares both evaluation and data type; therefore === is recommended most of the 
// time:
if("1" == 1){
    console.log("\"1\" == 1 evaluates to true");
}
if("1" !== 1) {
    console.log("\"1\" === 1 evaluates to false");
}


// Math
console.log("1 + 1 = ", 1 + 1);
console.log("1 - 1 = ", 1 - 1);
console.log("2 * 3 = ", 2 * 3);
console.log("2 ** 3 = ", 2 ** 3);
console.log("2 / 3 = ", 2 / 3);
console.log("7 % 5 = ", 7 % 5);
console.log("Math.PI is", Math.PI);
console.log("Math.E is", Math.E);
console.log("Math.round(2.5) is", Math.round(2.5));
console.log("Math.ceil(2.5) is", Math.ceil(2.5));
console.log("Math.ceil(-2.5) is", Math.ceil(-2.5));
console.log("Math.floor(2.5) is", Math.floor(2.5));
console.log("Math.floor(-2.5) is", Math.floor(-2.5));
console.log("Math.sqrt(-2.5) is", Math.sqrt(-2.5));
console.log("Math.sqrt(2.5) is", Math.sqrt(2.5));
console.log("Math.abs(2.5) is", Math.abs(2.5));
console.log("Math.pow(2, 5) is", Math.pow(2, 5));
console.log("Math.min(1, 2, 3, 4) is", Math.min(1, 2, 3, 4));
console.log("Math.min([2, 5]) is", Math.min([2, 5]));
console.log("Math.random() is", Math.random());

// String manipulation
const firstName = "John";
const lastName = "Doe";
console.log(firstName + ' ' + lastName);
console.log(firstName.concat(' ', lastName))
// Escape sequence
console.log('That\'s awesome!');
console.log('Line 1 \nLine 2');
console.log('Tab 1 \tTab2');
console.log(firstName.length);
console.log(firstName.toUpperCase());
console.log(firstName.toLowerCase());
console.log(firstName[0], firstName[1], firstName[2]);
console.log("012345".indexOf('3'));
console.log("012345".lastIndexOf('3'));
console.log("012345".charAt(1));
console.log("012345".substring(0, 4));
console.log("012345".slice(-1));
console.log("012345".split(""));
console.log("012345".replace("2", "two"));
console.log("012345".includes("foo"));
// Use backticks to define templated literals that encloses variable names or expressions
console.log(`My name is ${firstName} ${lastName}`);
console.log(`My age is ${30 >= 30 ? "30 or above" : "under 30"}`);

// SWITCH
let today = new Date();
let todayDayCardinal = today.getDay();
let todayDayNominal;
switch(todayDayCardinal) {
    case 0:
        todayDayNominal = "Sunday";
        break;
    case 1:
        todayDayNominal = "Monday";
        break;
    case 2:
        todayDayNominal = "Tuesday";
        break;
    case 3:
        todayDayNominal = "Wednesday";
        break;
    case 4:
        todayDayNominal = "Thursday";
        break;
    case 5:
        todayDayNominal = "Friday";
        break;
    case 6:
        todayDayNominal = "Saturday";
        break;
    default:
        todayDayNominal = `DayOfWeek cardinality invalid: ${todayDayCardinal}`;
}
console.log(`Today is ${todayDayNominal}`);

// FUNCTION
function hello_world() {
    console.log("Hello World");
}
hello_world()

function add(a, b) {
    return a + b;
}
console.log(add(1, 2))

// define default values for parameters (ES2015 and later)
function getShirtSize(height = 180) {
    if(height >= 180) {
        return "Large";
    } else {
        return "Small";
    }
}
console.log(getShirtSize(170));
console.log(getShirtSize());

// Function can be assigned to variables:
const square = function(x) {
    return x * x
};
console.log(square(2.2));

// Immediately invokable function expressions:
console.log((function(a, b){return a+b;})(1, 2));

// Function can also be instance methods
person = {
    birthday: new Date("09/01/1990"),
    getAge: function(){return (new Date()).getFullYear() - this.birthday.getFullYear();}
};


// With regard to for-loops, JavaScript behaves in similar fashion to Java
const numericalWords = ["Zero", "One", "Two"];
for(let i=0; i<numericalWords.length; i++){
    console.log(numericalWords[i]);
}

// We can use keywords to short-circuit a loop, break a loop, etc..
const nTossesMax = 100;
let tossResult = 0;
for(let n=1; n <= nTossesMax; n++){
    // Keep tossing a coin until a head is achieved, at which point print a message and exit the loop
    tossResult = Math.round(Math.random());
    if(tossResult === 1){
        console.log(`Head is achieved after ${n} coin toss(es)`);
        break;
    }
}

for(let birthYear=1996; birthYear <= 1996+10; birthYear++){
    // Do not celebrate a birthday except for when there is a leap year
    if(birthYear % 4 != 0) {
        continue;
    } else {
        console.log(`${birthYear} is a leap year!`)
    }
}

// Let's implement the same coin toss experiment using a while loop
let testResult2 = 0;
let nTries = 0;
while(testResult2 !== 1){
    testResult2 = Math.round(Math.random());
    nTries += 1;

    if(nTries > nTossesMax){
        break;
    }
}
console.log(`${nTries} toss(es) before getting a head`);

// Let's implement a monopoly dice toss where the game ends when three consecutive doubles were achieved
let diceOne = 0;
let diceTwo = 0;
let diceToss = function(){
    return 1 + Math.floor(6 * Math.random());
}
let nDoubles = 0;
let nMonopolyTries = 0;

do{
    diceOne = diceToss();
    diceTwo = diceToss();
    nMonopolyTries += 1;
    if(diceOne === diceTwo){
        nDoubles += 1;
    } else {
        nDoubles = 0;
    }
}
while(nDoubles < 3);
console.log(`${nMonopolyTries} double dice tosses before three consecutive doubles`);

// Array objects have instance attribute .forEach, which takes a function that takes one argument:
let germanNumbers = ["Null", "Ein", "Zwei", "Drei"];
let englishNumbers = ["zero", "one", "two", "three"];
const englishToGerman = {
    "zero": "Null",
    "one": "Ein",
    "two": "Zwei",
    "three": "Drei"
};
englishNumbers.forEach(function(englishNumber){
    germanNumber = englishToGerman[englishNumber];
    console.log(`"${englishNumber}" in English translates to "${germanNumber}" in Deutsche`)
});


// Another way of iteration is by using Map:
// The main difference between map and forEach is that map returns something for each element in the list,
// but forEach does not.
let userIds = ["00", "01", "02"];
let users = {
    "00": "Clark Kent",
    "01": "Bruce Warne",
    "02": "Diana Prince"
};
userFullNames = userIds.map(function(userId){
    return users[userId];
})
console.log(userFullNames);

// Directly iterating on the elements in a for loop:
const houseNumbers = ["1799", "1820", "1933"];
const houseA = {
    houseNumber: "1799",
    houseMarketValue: 1000000
}
for(let houseNumberI in houseNumbers){
    console.log(houseNumberI, houseNumbers[houseNumberI]);
}
for(let attributeName in houseA){
    console.log(`${attributeName} is ${houseA[attributeName]}`)
}

