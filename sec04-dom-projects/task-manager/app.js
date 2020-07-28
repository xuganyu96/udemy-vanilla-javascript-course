const deleteGrandParent = function(e){
    /* 
    ONLY FOR EVENT LISTENER!
    Delete the parent element's parent element.
    */
    const target = e.target;
    target.parentElement.parentElement.remove();
}

const buildDeleteTaskButton = function(){
    const deleteTaskIcon = document.createElement('i');
    deleteTaskIcon.className = "fa fa-remove"
    const deleteTaskButton = document.createElement('a');
    deleteTaskButton.setAttribute('href', '#');
    deleteTaskButton.className = "delete-item secondary-content";
    deleteTaskButton.appendChild(deleteTaskIcon)
    deleteTaskButton.addEventListener('click', deleteGrandParent);
    
    return deleteTaskButton
}

const buildTaskItemElement = function(taskString){
    /*
    Given a string taskString that is the name of the task, construct an <li> element that can later be attached to the
    parent <ul> element. The <li> element will have the following:
    -   class "collection-item"
    -   Children:
        1.  A text node that contains the taskString
        2.  An <a> tag with class "delete-item secondary-content" and href="#"
            2.1 An <i> tag: <i class="fa fa-remove"></i>
    */
    const newTaskItem = document.createElement('li');
    newTaskItem.className = "collection-item";
    const newDeleteButton = buildDeleteTaskButton();
    newTaskItem.appendChild(document.createTextNode(taskString));
    newTaskItem.appendChild(newDeleteButton);

    return newTaskItem;
}

const addTaskItemElement = function(taskString){
    /*
    Given a string taskString, build a new <li> element that is a task listing, then append it to the task collection
    */
   const taskCollection = document.querySelector('ul.collection');
   console.log(taskCollection);
   const newTaskItem = buildTaskItemElement(taskString);
   taskCollection.appendChild(newTaskItem);
}

const deleteAllTaskItems = function(){

    /* 
    Remove all children of the <ul> element
    */
   
    const taskCollection = document.querySelector('ul.collection');
    const nTasks = document.querySelectorAll('ul.collection li.collection-item').length;
    if(confirm(`Delete all ${nTasks} tasks?`)) {
        while(taskCollection.children.length != 0){
            taskCollection.children[0].remove();
        }
        console.log(`${nTasks} tasks deleted`);    
    }   
}


const clearTasksButton = document.querySelector('.clear-tasks');
clearTasksButton.addEventListener('click', deleteAllTaskItems);

const taskInputForm = document.querySelector('#task-form');
taskInputForm.addEventListener('submit', function(e){
    e.preventDefault();
    
    const taskInputText = taskInputForm.querySelector("input[type='text']");
    if(taskInputText.value.length != 0){
        addTaskItemElement(taskInputText.value);
        taskInputForm.reset();
    } else {
        alert("You cannot add empty task");
    }
})
