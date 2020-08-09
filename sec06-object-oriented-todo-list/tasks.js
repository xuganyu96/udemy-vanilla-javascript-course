/*
This script contains an ES5 implementation of the Task class, an instance of which corresponds to a single task item on 
the task list
*/
const deepSetAttribute = function(e, k, v) {
    // Given HTML element e, set e and all its descendents, including children of children, to have attribute k: v
    if(e.children.length === 0){
        e.setAttribute(k, v);
    }else{
        e.setAttribute(k, v);
        Array.from(e.children).forEach(function(value){deepSetAttribute(value, k, v)});
    }
}


function TaskItem(taskString, dueDate, isActive){
    // taskString is a String, dueDate is a Date; dueDate is optional
    this.taskString = taskString;
    this.dueDate = dueDate;
    this.isActive = isActive ? isActive : true;

    this.getDaysLeft = function(){
        // Compute the number of days left. If an item has no dueDate, then return Infinity;
        // e.g. if dueDate is 2020-08-08, and today is 2020-08-08, then return 0
        // e.g. if dueDate is 2020-08-08, and today is 2020-08-07, then return 1
        if(dueDate === null){
            return null
        }else{
            const dueDate = new Date(this.dueDate.getFullYear(), this.dueDate.getMonth(), this.dueDate.getDate());
            const now = new Date(Date.now());
            const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
            const daysDelta = (dueDate - today) / (1000 * 3600 * 24);

            return daysDelta
        }
    }
    this.displayDaysLeft = function(){
        const daysDelta = this.getDaysLeft();
        if(daysDelta > 0){
            // if "today" is strictly before dueDate's date, then display "n days until due"
            return `${daysDelta} day(s) until due`
        }else if(daysDelta === 0){
            // if "today" is the same as dueDate's date, then display "due Today"
            return `due today`
        }else if(daysDelta < 0){
            // if "today" is strictly after dueDate's date, then display "n days overdue"
            return `${-daysDelta} day(s) overdue`
        }else{
            return ""
        }
    }
    this.encodeToString = function(){
        return JSON.stringify(
            {
                taskString: this.taskString,
                dueDate: this.dueDate,
                isActive: this.isActive
            }
        )
    }
}
// This is a static method
TaskItem.decodeFromString = function(encodedTask){
    const rawObj = JSON.parse(encodedTask);
    return new TaskItem(rawObj.taskString, rawObj.dueDate, rawObj.isActive);
}
TaskItem.decodeFromObj = function(rawObj){
    return new TaskItem(rawObj.taskString, rawObj.dueDate, rawObj.isActive);
}

function TaskStorage(localStorageKey){
    /*
    This is the representation of the layer between HTML and localStorage; 
    this.taskList is the ultimate source of truth;
    */
    this.taskList = [];
    this.localStorageKey = localStorageKey;

    this.save = function(){
        localStorage.setItem(this.localStorageKey, JSON.stringify(this.taskList));
    }
    this.load = function(){
        rawTaskList = JSON.parse(localStorage.getItem(this.localStorageKey));
        this.taskList = rawTaskList.map(function(value){return TaskItem.decodeFromObj(value)})
    }
    this.add = function(taskItem){
        this.taskList.push(taskItem);
        this.save();
    }
    this.deactivate = function(i){
        // Given integer i, set the taskItem at index i to "deactivated"
        this.taskList[i].isActive = false;
        this.save();
    }
    this.deactivateAll = function(){
        this.taskList.forEach(function(value){value.isActive = false});
    }
    this.delete = function(i){
        // Given integer i, set the taskItem at index i to null;
        this.taskList[i] = null;
        this.save();
    }
    this.get = function(i){
        // Given integer i, return the taskItem at index i
        return this.taskList[i];
    }
    this.init = function(reset){
        if((localStorage.getItem(this.localStorageKey) === null) | reset){
            this.taskList = [];
            this.save()
        }else{
            this.load()
        }
    }
}

function TaskDisplay(taskCollection, taskStorage){
    /*
    Class for handling displayed HTML elements. It takes the <ul class="collection"></ul> element and mutates it by 
    adding and/or removing children
    */
    this.taskCollection = taskCollection ? taskCollection : document.querySelector(".collection")
    this.taskStorage = taskStorage

    this.createTaskItemElement = function(taskItem, taskIndex){
        // Given a taskItem, return an HTML Element that is the taskItem, with proper delete button and event listener
        // Here is an example:
        /*
        <li class="collection-item">
            Task 1
            <small>due in 2 days</small>
            <a href="#" class="delete-item secondary-content">
                <i class="fa fa-remove"></i>
            </a>
        </li>
        */
        const newTaskItemHTML = document.createElement("li");
        newTaskItemHTML.className = "collection-item";
        const newDeleteButton = this.createDeleteButtonElement();
        const newDueDateText = this.createDueDateText(taskItem);

        newTaskItemHTML.appendChild(document.createTextNode(taskItem.taskString));
        newTaskItemHTML.appendChild(newDueDateText);
        newTaskItemHTML.appendChild(newDeleteButton);
        deepSetAttribute(newTaskItemHTML, 'taskid', taskIndex);

        return newTaskItemHTML
    }

    this.createDeleteButtonElement = function(){
        // Build the element <a href="#" className="delete-item secondary-content"><i></i></a>
        // At this stage no "taskid" attribute is assigned yet
        const deleteTaskIcon = document.createElement('i');
        deleteTaskIcon.className = "fa fa-remove"

        const deleteTaskButton = document.createElement('a');
        deleteTaskButton.setAttribute('href', '#');
        deleteTaskButton.className = "delete-item secondary-content";
        deleteTaskButton.appendChild(deleteTaskIcon)

        const _this = this;
        deleteTaskButton.addEventListener('click', function(e){
            const taskID = Number(e.target.getAttribute('taskid'));
            _this.taskStorage.deactivate(taskID);
            _this.refresh();
        })
        
        return deleteTaskButton
    }

    this.createDueDateText = function(taskItem){
        const newDueDateText = document.createElement("small")
        newDueDateText.appendChild(document.createTextNode(taskItem.displayDaysLeft()))
        newDueDateText.style.marginLeft = "1em";

        if(newDueDateText.innerText.includes("overdue") | newDueDateText.innerText.includes("today")){
            newDueDateText.style.color = "red";
        }

        return newDueDateText
    }

    this.refresh = function(filterInput){
        // Given an array of TaskItem objects, display all active tasks onto the collection element after completely
        // removing all children of the collection
        while(this.taskCollection.firstChild){
            this.taskCollection.removeChild(this.taskCollection.firstChild)
        }

        
        const _this = this
        const filterKey = filterInput ? filterInput : ""
        this.taskStorage.taskList.forEach(function(value, index){
            if(value.isActive & value.taskString.includes(filterKey)){
                const taskItemElement = _this.createTaskItemElement(value, index)
                _this.taskCollection.appendChild(taskItemElement)
            }
        })
    }
}


// const YESTERDAY = new Date(Date.now() - (1000 * 24 * 3600));
// const TODAY = new Date(Date.now());
// const WEEKFROMTODAY = new Date(Date.now() + (1000 * 24 * 3600 * 7));
// const pastTask = new TaskItem("sample overdue task", YESTERDAY);
// const todayTask = new TaskItem("sample today task", TODAY);
// const futureTask = new TaskItem("sample future task", WEEKFROMTODAY);
// const timelessTask = new TaskItem("no due date", null);
// console.log(pastTask.displayDaysLeft());
// console.log(todayTask.displayDaysLeft());
// console.log(futureTask.displayDaysLeft());

// const storage = new TaskStorage('taskList');
// const display = new TaskDisplay(document.querySelector(".collection"), storage);

// storage.add(todayTask);
// storage.add(pastTask);
// storage.add(futureTask);
// storage.add(timelessTask);
// display.refresh();
