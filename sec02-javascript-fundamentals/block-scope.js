////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// SCOPES IN JAVASCRIPT
// There are three scopes that we are concerned with most of the times: the global scope, the function scope, and the 
// block scope. They respectively correspond to the global environment, the environment within a function's code,
// and the environment within a code block under a loop or a conditional statement
// 
// Behaviors in different scopes define major distinction among "let", "const", and "var" when it comes to instantiating
// variables
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Begin by defining three variables in the global scope
let letVariable = "let";
const constVariable = "const";
var varVariable = "var";
console.log(
    "Variables defined under global scope:\n" + 
    `letVariable = ${letVariable}\n` +
    `constVariable = ${constVariable}\n` +
    `varVariable = ${varVariable}`
)

// Define a function and try to change the variables in the function's scope:
function funcScope(){
    // All three ways of defining variables respect the function scope
    let letVariable = "let inside a function";
    const constVariable = "const inside a function";
    var varVariable = "var inside a function";
    console.log(
        "Variables defined under function scope:\n" + 
        `letVariable = ${letVariable}\n` +
        `constVariable = ${constVariable}\n` +
        `varVariable = ${varVariable}`
    )
}
funcScope();
console.log(
    "Variables defined under global scope after function is run:\n" + 
    `letVariable = ${letVariable}\n` +
    `constVariable = ${constVariable}\n` +
    `varVariable = ${varVariable}`
)

// Now here comes the fun part: the block scope.
// Block scope separates "var" defined variables from "let" defined variables:
if(true){
    let letVariable = "let inside block";
    const constVariable = "const inside block";
    var varVariable = "var inside block";
    console.log(
        "Variables defined under block scope:\n" + 
        `letVariable = ${letVariable}\n` +
        `constVariable = ${constVariable}\n` +
        `varVariable = ${varVariable}`
    )
}
console.log(
    "Variables defined under global scope after block is run:\n" + 
    `letVariable = ${letVariable}\n` +
    `constVariable = ${constVariable}\n` +
    `varVariable = ${varVariable}`
)
// Note that "let"-defined and "const"-defined variables were not reassigned to new values outside the block, but 
// the "var"-defined varable was reassigned.

// Finally, on how to mutate a letVariable inside a block
if(true){
    letVariable = "Forced mutation on letVariable";
}
console.log(`letVariable = ${letVariable}`);

