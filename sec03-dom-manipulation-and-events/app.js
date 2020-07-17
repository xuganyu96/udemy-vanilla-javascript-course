/*
The "document" object in a webpage:
*/
// document is an attribute of the window object, and it is the wrapper object for all the HTML elements on a webpage.
// You can directly access it by calling "document"
console.log(`The variable name "document" points to an ${typeof document}`);
// In particular, document.all is an HTMLCollection of HTML elements, each of which correpsonds to a tag in the HTML
console.log(`The document holds ${document.all.length} elements in total`);
for(let i in document.all){
    if(i > 2){
        break;
    }
    // You can traverse through the indices; for simplier 
    console.log(`The element at index ${i} is ${document.all[i]}`);
}

// There are a few more attributes accessible from the document object:
console.log(`"document.head" evaluates to ${document.head}`);
console.log(`"document.doctype" evaluates to ${document.doctype}`);
console.log(`"document.characterSet " evaluates to ${document.characterSet}`);
console.log(`"document.domain" evaluates to ${document.domain}`);
console.log(`"document.URL" evaluates to ${document.URL}`);

// NOT RECOMMENDED:
// You can select elements by their tags:
// By default the method below returns an HTML collection, regardless of how many elements there are
console.log(`There are ${document.forms.length} <form> elements in this document`);
console.log(`There are ${document.links.length} <a> elements in this document`);

// Two cool attribute for finding out about an element's classes:
console.log(document.links[0].className); // This is a single string of space separated class names
console.log(document.links[0].classList); // This is a DOMTokenList

// If there is no matching elements, then an empty HTML Collection will be returned
console.log(document.images);

// You can also access attributes by getAttribute
console.log(document.scripts[0].getAttribute('src'));

// Canonically HTMLCollection can not have .forEach applied:
try{
    document.links.forEach(function(link){console.log(link)});
} catch(err) {
    console.log(err)
}
// However, you can iterate by converting an HTMLCollection object to an Array
linksArray = Array.from(document.links)
linksArray.forEach(function(link){console.log(link.getAttribute('class'));})

/*
Selecting a single element in a webpage
*/
// The easiest way to select an HTML element is by its id attribute
taskTitle = document.getElementById("task-title");
console.log(`${typeof taskTitle}'s id is ${taskTitle.id}`);
// Once an element is selected, we can reassign its attributes to modify how it is displayed
console.log(`task-title's font weight is originally undeclared`);
taskTitle.style.fontWeight = 'bold';
console.log(`task-title's font weight is now ${taskTitle.style.fontWeight}`);
// One way to make an element disappear is by setting "display" to "none":
// taskTitle.style.display = 'none';
// Modify the text content within this tag using innerText attribute
console.log(`"taskTitle.innerText evaluates to ${taskTitle.innerText}`);
taskTitle.innerText = "My Tasks"
console.log(`"taskTitle.innerText is reassigned to ${taskTitle.innerText}`);
// We can also insert HTML!
taskTitle.style.display = 'flex';
taskTitle.style.alignItems = "center";
taskTitle.innerHTML = "<i class='material-icons'>assignment</i><span>My Tasks</span>";
// A more powerful way is by using querySelector, which takes in CSS Selector. querySelector is always selecting a 
// single element, and if there are more than one fitting elements, the first one will be selected
// Select by ID using a pound-sign 
console.log(`The query "#task-title" corresponds to ${document.querySelector('#task-title')}`);
// Select by class using the dot (will return the first element of this class)
collectionItem = document.querySelector('.collection-item');
console.log(collectionItem.innerText);
// Select by tag
let collectionUL = document.querySelector("ul");
console.log(collectionUL);
// To select one among the many using pseudo-classes
collectionItem2 = document.querySelector('.collection-item:nth-child(2)')
collectionItem2.innerHTML = 'Selected by <span style="font-family:Monospace;color:blue;">.collection-item:nth-child(2)</span>'

/*
Selecting multiple elements in a webpage
*/
// The more basic way is using functions mentioned below, which returns HTMLCollection objects.
let collectionItems = document.getElementsByClassName('collection-item');
console.log(collectionItems);
collectionItems[0].innerHTML = "Selected by " +
"<span style=\"font-family:Monospace;color:blue;\">document.getElementsByClassName('collection-item')[0]</span>";
// Recall 
// let collectionUL = document.querySelector("ul");
let collectionLIs = collectionUL.getElementsByTagName('li');
console.log(`There are ${collectionLIs.length} <li> tags in first <ul> element`)
// Now the better way: querySelectorAll; querySelectorAll returns a NodeList, which behaves like a list and can have
// forEach applied to it
collectionItems = document.querySelectorAll('ul li');
console.log(collectionItems);
console.log(`document.querySelectorAll(\'ul li\').length evluates to ${collectionItems.length}`);
collectionItems.forEach(function(li, index){
    console.log(li, index, li.innerText);
})
// Finally let's do a striping list just for the heck of it:
let collectionItemEven = document.querySelectorAll('ul li:nth-child(even)');
for(let itemIndex = 0; itemIndex < collectionItemEven.length; itemIndex++){
    item = collectionItemEven[itemIndex];
    item.style.background = "#eee"
}
let collectionItemOdd = document.querySelectorAll('ul li:nth-child(odd)');
console.log("H", collectionItemOdd);
collectionItemOdd.forEach(function(li){
    li.style.background="#ccc";
});
