/*
This script contains an ES5 implementation of the Task class, an instance of which corresponds to a single task item on 
the task list
*/

function TaskItem(taskString, dueDate, isActive){
    // taskString is a String, dueDate is a Date; dueDate is optional
    this.taskString = taskString;
    this.dueDate = dueDate;
    this.isActive = isActive ? isActive : true;

    this.getDaysLeft = function(){
        // Compute the number of days left. If an item has no dueDate, then return Infinity;
        // e.g. if dueDate is 2020-08-08, and today is 2020-08-08, then return 0
        // e.g. if dueDate is 2020-08-08, and today is 2020-08-07, then return 1
        const dueDate = new Date(this.dueDate.getFullYear(), this.dueDate.getMonth(), this.dueDate.getDate());
        const now = new Date(Date.now());
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        const daysDelta = (dueDate - today) / (1000 * 3600 * 24);

        return daysDelta
    }
    this.displayDaysLeft = function(){
        const daysDelta = this.getDaysLeft();
        if(daysDelta > 0){
            // if "today" is strictly before dueDate's date, then display "n days until due"
            return `${daysDelta} days until due`
        }else if(daysDelta === 0){
            // if "today" is the same as dueDate's date, then display "due Today"
            return `due today`
        }else{
            // if "today" is strictly after dueDate's date, then display "n days overdue"
            return `${-daysDelta} days overdue`
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

const LOCAL_STORAGE_KEY = 'taskList'
function ToDoListApp(){
    /*
    This is the representation of the layer between HTML and localStorage; 
    this.taskList is the ultimate source of truth;
    */
    this.taskList = [];

    this.save = function(){
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(this.taskList));
    }
    this.load = function(){
        rawTaskList = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
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
        if((localStorage.getItem(LOCAL_STORAGE_KEY) === null) | reset){
            this.taskList = [];
            this.save()
        }else{
            this.load()
        }
    }
}


const YESTERDAY = new Date(Date.now() - (1000 * 24 * 3600));
const TODAY = new Date(Date.now());
const WEEKFROMTODAY = new Date(Date.now() + (1000 * 24 * 3600 * 7))
const pastTask = new TaskItem("sample overdue task", YESTERDAY);
const todayTask = new TaskItem("sample today task", TODAY);
const futureTask = new TaskItem("sample future task", WEEKFROMTODAY);
console.log(pastTask.displayDaysLeft());
console.log(todayTask.displayDaysLeft());
console.log(futureTask.displayDaysLeft());

const app = new ToDoListApp()
app.init();
// There is a problem where if 
