// Script for locally persistent task list
const taskListStorage = {
    init: function(reset){
        // If reset is True or if taskList is not defined in localStorage, then define it as an empty array
        if(reset || localStorage.getItem('taskList') === null){
            console.log("Setting localStorage.taskList to empty array")
            localStorage.setItem('taskList', JSON.stringify([]));
        } else {
            console.log("Skipping localStorage.taskList reset")
        }
    },
    add: function(newTaskString) {
        // Add a new task with the task String, with taskStatus default to "active"
        const taskList = JSON.parse(localStorage.getItem('taskList'));
        let newTask = null;
    
        if(taskList.length === 0){
            newTask = {taskID: 0, taskString: newTaskString, taskStatus: "active"};
        }else{
            const taskIDs = taskList.map(function(value){return value.taskID});
            const maxID = Math.max.apply(null, taskIDs);
            const newID = maxID + 1;
            newTask = {taskID: newID, taskString: newTaskString, taskStatus: "active"};
        }
    
        taskList.push(newTask);
        localStorage.setItem("taskList", JSON.stringify(taskList));
        return newTask
    },
    delete: function(targetID) {
        // Note that we don't remove items; we simply set the corresponding task's status to "deleted"
        const taskList = JSON.parse(localStorage.getItem('taskList'));
        const taskIDs = taskList.map(function(value){return value.taskID});
    
        if(taskIDs.includes(targetID)){
            taskList.forEach(function(value){
                if(value.taskID === targetID){
                    value.taskStatus = "deleted";
                }
            })
    
            localStorage.setItem("taskList", JSON.stringify(taskList));
            console.log(`Task with id ${targetID} is marked "deleted"`);
        }else{
            console.log(`Task with id ${targetID} is not found`);
        }
    },
    deleteAll: function() {
        const taskList = JSON.parse(localStorage.getItem('taskList'));
        const taskIDs = taskList.map(function(value){return value.taskID});
    
        taskIDs.forEach(function(value){taskListStorage.delete(value)});
    },
    getAllTasks: function() {
        return JSON.parse(localStorage.getItem('taskList'));
    },
    getActiveTasks: function() {
        const allTasks = taskListStorage.getAllTasks();
        const activeTasks = [];
        allTasks.forEach(function(value){
            if(value.taskStatus === "active"){
                activeTasks.push(value);
            }
        })

        return activeTasks;
    }
}

taskListStorage.init(true);
taskListStorage.add("Task 0");
taskListStorage.add("Task 1");
taskListStorage.add("Task 2");
console.log(taskListStorage.getActiveTasks());
taskListStorage.delete(0);
console.log(taskListStorage.getActiveTasks());
taskListStorage.deleteAll();
console.log(taskListStorage.getActiveTasks());



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
const postNewTaskItem = function(e){
    e.preventDefault();
    
    const taskInputText = taskInputForm.querySelector("input[type='text']");
    if(taskInputText.value.length != 0){
        addTaskItemElement(taskInputText.value);
        taskInputForm.reset();
    } else {
        alert("You cannot add empty task");
    }
}
taskInputForm.addEventListener('submit', postNewTaskItem)
