console.log("'window' is a special variable that is already defined in a browser session");

// Let's explore the first a few of the attributes of a window object:
windowAttributeKeys = Object.keys(window);
windowAttributes = [];
let windowAttributeKey;
for(let windowAttributeKeyIndex in windowAttributeKeys) {
    windowAttributeKey = windowAttributeKeys[windowAttributeKeyIndex]
    windowAttributes.push({
        windowAttributeKey: windowAttributeKey,
        valueType: typeof window[windowAttributeKey]
    });

    if(windowAttributeKeyIndex >= 5){
        break;
    }
}
console.table(windowAttributes)

// The "document" attribute of the window object is the core of the Document Object Model (DOM)
// But first let's play with a few of window object's method:
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
alert("Alert messaged sent through the alert method"); // equivalent to window.alert
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const input = window.prompt("Enter something: ");
if(input === null){
    alert("You have clicked \"Cancel\"");
} else {
    alert(`You have entered ${input}`);
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
if(confirm("Click OK or Cancel")) {
    alert("You have clicked \"OK\"")
} else {
    alert("You have clicked \"Cancel\"")
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Outer height and outer width count the height and width (in pixels) of the browser window
// Inner height and inner width count the height and width (in pixels) of the viewport, excluding things like the scroll
// bar, the developer console, etc..
console.log(`outer height is ${window.outerHeight}`);
console.log(`outer width is ${window.outerWidth}`);
console.log(`inner height is ${window.innerHeight}`);
console.log(`inner width is ${window.innerWidth}`);
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ScrollY and ScrollX respectively compute the position of the top of the viewport and the left of the viewport
// When the scroll bar is at the topmost and leftmost position, scrollY and scrollX are both 0, respectively
console.log(`scrollY is at ${window.scrollY}`);
console.log(`scrollX is at ${window.scrollX}`);
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// The location object is an attribute of the window object; it can be accessed directly with keyword "location"
console.log(`Server's hostname is ${location.hostname}`);
console.log(`Server's port is ${location.port}`);
console.log(`This page's URL is ${location.href}`);
// You can also hard code a page refresh:
if(confirm("Do you want to refresh the page?")){
    location.reload();
}else{
    console.log("User cancelled the refresh");
}
// You can redirect to a different URL by reassigning the href attribute:
if(confirm("Do you want to go to google?")){
    location.href = "https://google.com";
}else{
    console.log("User refused to go to Google");
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// The history object: closely related to the "go back" and "go forward" buttons on the browser:
// history.go is a method that is equivalent to clicking forward/backward buttons a few times, depending on whether a 
// positive or a negative integer is supplied
// history.go(1) 
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// The navigator object is closely related to the browser itself: here are a few things:
console.log(`User's operating system's platform is ${navigator.platform}`);
console.log(`User's browser name is ${navigator.appName}`);
console.log(`User's broswer version is ${navigator.appVersion}`);

