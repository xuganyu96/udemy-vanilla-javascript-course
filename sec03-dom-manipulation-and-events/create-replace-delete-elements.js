////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// CREATE NEW ELEMENTS
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// One way to create new elements if by using the document.createElement method; after the element is created, you can 
// modify its attributes such as class, 
const newLI = document.createElement('li');
newLI.className = 'collection-item';
newLI.id = 'new-list-item';
// You can add new attributes that are not inherently defined in the HTML Element
newLI.setAttribute("title", "New List Item");
// Create the inner node content and append them to the new listing. In case the inner content includes a text node and
// an HTML element like:
// <li>New task created by JS <a href="#" class="..."><i class="..."></i></a></li>
function createTaskItem(taskName){
    const newTaskItem = document.createElement('li')
    newTaskItem.className = 'collection-item';
    const taskText = document.createTextNode(taskName);
    const deleteIcon = document.createElement("i");
    deleteIcon.className = "fa fa-remove"
    const deleteTask = document.createElement('a');
    deleteTask.href = "#";
    deleteTask.className = "delete-item secondary-content"
    deleteTask.appendChild(deleteIcon)
    newTaskItem.appendChild(taskText);
    newTaskItem.appendChild(deleteTask);

    return newTaskItem;
}
let newTaskItem = createTaskItem('New task created by JS')
// Finally, add this new element/node to the unordered list (UL) element by using the same .appendChild method
const taskList = document.querySelector("ul.collection");
taskList.appendChild(newTaskItem) 


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// REPLACE AN ELEMENT
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// We can call .replaceChild to replace one child element with another. For example, let's replace the first list item
// with the one that we just created
const newTaskItem2 = createTaskItem(`Task 1 has been replaced`);
const oldTaskItem = taskList.children[0];
taskList.replaceChild(newTaskItem2, oldTaskItem);


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// REMOVE AN ELEMENT
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const newTaskItem3 = createTaskItem("This task will be removed");
const newTaskItem4 = createTaskItem("This task will be removed, too");
taskList.appendChild(newTaskItem3);
taskList.appendChild(newTaskItem4);
// Here are many ways to remove an element:
// Directly call remove():
newTaskItem3.remove();
// Remove by calling removeChild
taskList.removeChild(newTaskItem4);


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// CLASSES AND ATTRIBUTES
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Aside from re-assigning the className attribute, we can individually add and remove class from element
newTaskItem.classList.add("new-class");
newTaskItem.classList.add("new-class-2");
newTaskItem.classList.remove("new-class-2");
console.log(newTaskItem);

// Use .getAttribute and .setAttribute to get and set attribute, like href, title, and placeholder
taskNameInput = document.querySelector("#task-form input");
console.log(taskNameInput.getAttribute("id"));
console.log(taskNameInput.getAttribute("name"));
taskNameInput.setAttribute('placeholder', 'Enter new task here');
// Use .hasAttribute to check if said attribute exists; getAttribute on non-existing attribute returns null
console.log(`Does taskNameInput have href attribute? ${taskNameInput.hasAttribute('href')}`);
console.log(`taskNameInput.getAttribute('href') evaluates to ${taskNameInput.getAttribute('href')}`);
// Use removeAttribute to remove an attribute
taskNameInput.removeAttribute('placeholder');
