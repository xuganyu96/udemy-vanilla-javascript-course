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

const deepSetAttribute = function(e, k, v) {
    // Given HTML element e, set e and all its descendents, including children of children, to have attribute k: v
    if(e.children.length === 0){
        e.setAttribute(k, v);
    }else{
        e.setAttribute(k, v);
        Array.from(e.children).forEach(function(value){deepSetAttribute(value, k, v)});
    }
}

const taskListDisplay = {
    buildDeleteTaskButton: function(){
        // Build the element <a href="#" className="delete-item secondary-content"><i></i></a>
        // At this stage no "task_id" attribute is assigned yet
        const deleteTaskIcon = document.createElement('i');
        deleteTaskIcon.className = "fa fa-remove"

        const deleteTaskButton = document.createElement('a');
        deleteTaskButton.setAttribute('href', '#');
        deleteTaskButton.className = "delete-item secondary-content";
        deleteTaskButton.appendChild(deleteTaskIcon)

        deleteTaskButton.addEventListener('click', function(e){
            const taskID = Number(e.target.getAttribute('task_id'));
            taskListStorage.delete(taskID);
            taskListDisplay.refreshTaskListView();
        })
        
        return deleteTaskButton
    },
    buildTaskItemElement: function(taskItem){
        /*
        Given a string taskString that is the name of the task, construct an <li> element that can later be attached to the
        parent <ul> element. The <li> element will have the following:
        -   class "collection-item"
        -   Children:
            1.  A text node that contains the taskString
            2.  An <a> tag with class "delete-item secondary-content" and href="#"
                2.1 An <i> tag: <i class="fa fa-remove"></i>
        */
        const newTaskItemElement = document.createElement('li');
        newTaskItemElement.className = "collection-item";
        const newDeleteButton = taskListDisplay.buildDeleteTaskButton();
        newTaskItemElement.appendChild(document.createTextNode(taskItem.taskString));
        newTaskItemElement.appendChild(newDeleteButton);
        deepSetAttribute(newTaskItemElement, 'task_id', taskItem.taskID);

        return newTaskItemElement;
    },
    refreshTaskListView: function(){
        // Iterate through the active tasks and display them on to the collection

        // First clear the current selection
        const taskListElement = document.querySelector("ul.collection");
        taskListElement.querySelectorAll("li").forEach(function(value){value.remove();});

        // Add all active tasks that matches task filtering; if task filtering is empty, then display all active tasks
        const activeTasks = taskListStorage.getActiveTasks()
        activeTasks.forEach(function(value){
            const taskItemElement = taskListDisplay.buildTaskItemElement(value);

            let filterStr = document.querySelector("#filter").value;
            if(value.taskString.includes(filterStr)){
                taskListElement.appendChild(taskItemElement);
            }
        })
    }
}

// Now let's define the events
taskInputForm = document.querySelector("#task-form");
taskInputForm.addEventListener('submit', function(e){
    e.preventDefault();
    form = e.target;
    inputTaskString = form.querySelector('#task').value;
    if(inputTaskString.length === 0){
        alert("You cannot add empty task!");
    }else{
        taskListStorage.add(inputTaskString);
        taskListDisplay.refreshTaskListView();
    }
    form.reset();
})

clearTasksButton = document.querySelector(".clear-tasks");
clearTasksButton.addEventListener('click', function(e){
    taskListStorage.deleteAll();
    taskListDisplay.refreshTaskListView();
})

filterTasksInput = document.querySelector("#filter");
filterTasksInput.addEventListener("keyup", function(e){
    taskListDisplay.refreshTaskListView();
})

taskListStorage.init(true);
taskListDisplay.refreshTaskListView();