// EVENT LISTENERS
// We can add functions that carry out actions when specific event(s) happen. 
// Below is an example about a button click:
// Query the button element
const clearTaskButton = document.querySelector('.clear-tasks');
// Define the function to be executed; the eventListener function can take an argument that is the event object
function helloWorld(e) {
    console.log("Hello World");
}
// Add the function to the things that will happen when the link is clicked
clearTaskButton.addEventListener('click', helloWorld);
// A side note:
// If the link (<a> tag) element does not have href attribute defined, then the default behavior of the linked when 
// clicked is to refresh the page. This means that in the example above, helloWorld() would run, but then the page will
// refresh immediately afterwards, so you wouldn't be able to see the console log.
// One way to mitigate this unintended behavior is by assigning attribute href="#", which will prevent the refresh
// The other way is by adding a statement in the function that prevents the default behavior from being executed in the
// first place:
// 
// clearTaskButton.setAttribute('href', '');
// function helloWorldNoDefault(e) {
//     console.log("Hello World");
//     e.preventDefault();
// }
// clearTaskButton.addEventListener('click', helloWorldNoDefault);

// Let's inspect the event object passed into the event listener
addTaskButton = document.querySelector("input[type='submit']");
function inspectEvent(e) {
    // console.log(e);

    // Use the .target attribute the get back the HTML Element that the event happened to:
    targetElement = e.target;
    console.log(`A ${e.type} event happened to`);
    console.log(targetElement);
    console.log(`event time stamp is ${e.timeStamp}`);
    console.log(`mouse is at (X: ${e.clientX} Y: ${e.clientY}) relative to browser window when event happened`);
    console.log(`mouse is at (X: ${e.offsetX} Y: ${e.offsetY}) relative to element when event happened`);
    e.preventDefault();
}
// Try out the different types of mouse events
// addTaskButton.addEventListener('click', inspectEvent);
// addTaskButton.addEventListener('dblclick', inspectEvent);
// addTaskButton.addEventListener('mousedown', inspectEvent);
// addTaskButton.addEventListener('mouseup', inspectEvent);
// Mouse enter/leave differ from mouse over/out in that mouseover will fire a second time when your mouse moves from 
// the element with the eventListener onto a child element, but mouseenter will only fire once.
mainCard = document.querySelector('.card');
// mainCard.addEventListener('mouseenter', inspectEvent);
// mainCard.addEventListener('mouseleave', inspectEvent);
// mainCard.addEventListener('mouseover', inspectEvent);
// mainCard.addEventListener('mouseout', inspectEvent);

// Just for fun: add a mousemove event that updates the card with the coordinate of the mouse!
const mouseCoordTracker = document.createElement('span');
mouseCoordTracker.className = 'card-title';
mouseCoordTracker.innerText = "Your mouse is at: (NaN, NaN)"
const cardContent = document.querySelector('.card-content');
const taskListTitle = document.querySelector('.card-title');
cardContent.replaceChild(mouseCoordTracker, taskListTitle);
function updateMouseCoordinate(e) {
    mouseCoordTracker.innerText = `Your mouse is at (${e.offsetX}, ${e.offsetY})`;
}
function invalidateMouseCoordinate(e) {
    mouseCoordTracker.innerText = `Your mouse is outside the main card`;
}
mainCard.addEventListener('mousemove', updateMouseCoordinate);
mainCard.addEventListener('mouseout', invalidateMouseCoordinate);

// Let's explore a few more types. The first is "submit", which can happen to a form element
const taskInputForm = document.querySelector("#task-form");
function validateInputForm(e) {
    console.log(`Event type is ${e.type}`);
    console.log(`Event happend to ${e.target}`);

    const form = e.target;
    let formComponents = form.querySelectorAll("input");
    for(let i=0; i<formComponents.length; i++){
        let inputType = formComponents[i].getAttribute('type');
        let inputVal = formComponents[i].value;
        console.log(`${inputType} input evaluates to ${inputVal}`);
    }

    e.preventDefault();
}
taskInputForm.addEventListener('submit', validateInputForm);
// A few more keyboard events.
function updateNCharLeft(e) {
    // Count the number of characters in the task list input
    const taskTextInput = e.target;
    const taskTextInputLength = taskTextInput.value.length;
    const taskTextInputLabel = document.querySelector("label[for='task']");
    taskTextInputLabel.innerText = `${140 - taskTextInputLength} characters left`;
}
function resetTaskInputLabel(e) {
    // Count the number of characters in the task list input
    const taskTextInputLabel = document.querySelector("label[for='task']");
    if(e.target.value.length === 0){
        taskTextInputLabel.innerText = `New Task`;
    }else{
        taskTextInputLabel.innerText = `Changes not saved`;
    }
}
const taskTextInput = document.querySelector('#task');
// there is keyup, keydown, and keypress
taskTextInput.addEventListener('keyup', updateNCharLeft); 
taskTextInput.addEventListener('keydown', updateNCharLeft); 
// focus and unfocus:
taskTextInput.addEventListener('focus', updateNCharLeft);
taskTextInput.addEventListener('blur', resetTaskInputLabel);
// "copy" and "paste" also exist but I am too lazy to give it example
// Finally, there is event type "input", which is the union of all of above

// For "select" type of inputs, there is event "change", which will fire the option is changed.

