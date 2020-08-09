const storage = new TaskStorage('taskList');
const display = new TaskDisplay(document.querySelector(".collection"), storage);

taskInputForm = document.querySelector("#task-form");
taskInputForm.addEventListener('submit', function(e){
    e.preventDefault();
    const form = e.target;
    const inputTaskString = form.querySelector('#task').value;
    const inputDueDateString = form.querySelector('#due-date').value;

    const inputDueDate = (inputDueDateString.length === 0) ? null : (new Date(`${inputDueDateString} 00:00:00`))

    if(inputTaskString.length === 0){
        alert("You cannot add empty task!");
    }else{
        storage.add(new TaskItem(inputTaskString, inputDueDate));
    }
    form.reset();
    display.refresh();
})

clearTasksButton = document.querySelector(".clear-tasks");
clearTasksButton.addEventListener('click', function(e){
    storage.deactivateAll();
    display.refresh();
})

filterTasksInput = document.querySelector("#filter");
filterTasksInput.addEventListener("keyup", function(e){
    display.refresh(e.target.value);
})