// Event bubbling and delegation are a pair of the converse actions:
// In event bubbling, the listener is added to a child element, but the function logic is applied to the parent element
// In event delegation, the listener is added to a parent element, but the business logic is applied to the children

// EXAMPLE: Event bubbling
const addTaskSubmit = document.querySelector('input[type="submit"]');
console.log(addTaskSubmit, addTaskSubmit.parentElement, addTaskSubmit.parentElement.parentElement);
const bubblingEvent = function(e){
    console.log(`You have clicked on a ${e.target.tagName} tag`);
    e.preventDefault();
}
addTaskSubmit.addEventListener('click', bubblingEvent);
addTaskSubmit.parentElement.addEventListener('click', bubblingEvent);
addTaskSubmit.parentElement.parentElement.addEventListener('click', bubblingEvent);


// EXAMPLE: Event delegation
const taskList = document.querySelector('ul');
const clickDetector = function(e){
    console.log(`You have clicked on`, e.target)
}
const deleteTaskItem = function(e){
    // Note that this deleteTaskItem will be added to taskList instead of the individual task items
    // also a side note: <a> tag cannot be clicked, so we target the <i> tag but only the ones wrapped in <a> tag
    if(e.target.parentElement.classList.contains('delete-item')){
        if(confirm(`Delete task ${e.target.parentElement.parentElement.innerText}?`)) {
            e.target.parentElement.parentElement.remove()
        }
    }
}
taskList.addEventListener('click', clickDetector);
taskList.addEventListener('click', deleteTaskItem);
// First we observe the behavior of clickDetector:
// If I click on individual task item, the clickDetector function is still executed, but note that the target of the 
// event is the list item, despite that the event listener is added to the list collection object. In JavaScript, 
// clicking on a child element counts as clicking on a parent element.
// To filter on the indiscriminate firing of events, we simply add the conditional statements in the event listener to 
// target specific children, instead of everything. Hence the deleteTaskitem listener will only fire when the user 
// clicks on the "x" button
