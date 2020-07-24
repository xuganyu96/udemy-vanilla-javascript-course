// Local storage can be used to persist state between sessions and refreshes
// Session storage on the other hand, is lost when the browser window is closed
localStorage.setItem('name', 'Bruce');
console.log(localStorage.getItem('name'));
localStorage.removeItem('name');
// localStorage.clear();

// Here is a helper pair of functions that serialize JSON into string and back
console.log(
    JSON.stringify(["task 1", "task 2", "task 3"])
);
console.log(
    JSON.parse(`["task 1", "task 2", "task 3"]`)
);