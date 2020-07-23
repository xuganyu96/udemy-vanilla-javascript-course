// Navigating through the DOM

// Let's begin by examining a few attributes of some HTML nodes
const taskList = document.querySelector('ul.collection');
const taskItem1 = document.querySelector('ul li');
console.log(taskList)
console.log(taskItem1)

// HTML nodes have parent-children relationship as one HTML node can wrap another, thus being the "parent"
// The "children" attribute returns an HTMLCollection object that includes every explicitly defined HTML node inside
// the parent node.
// The "childNodes" attribute returns a NodeList that includes every explicitly defined HTML node AND "text" nodes
// that are the white space (line break, space, ...) between tags
let taskListChildren = taskList.children;
console.log(taskListChildren);
let taskListChildNodes = taskList.childNodes;
console.log(taskListChildNodes);
// An HTML node has a few interesting attributes:
console.log(`"taskListChildren[0].nodeName" evaluates to "${taskListChildren[0].nodeName}"`);
// nodeType is hardcoded:
console.log(`"taskListChildren[0].nodeType" (HTML node) evaluates to "${taskListChildren[0].nodeType}"`);
console.log(`"taskListChildNodes[0].nodeType" (text node) evaluates to "${taskListChildNodes[0].nodeType}"`);
console.log("comment nodes' nodeType is 8");
console.log(`"document.nodeType" (entire document) evaluates to "${document.nodeType}"`);
console.log(`"document.doctype.nodeType" (entire document) evaluates to "${document.doctype.nodeType}"`);
// firstChild will return the first child node, which might include non-element node
// firstElementChild will return the first element child
console.log(`Node type of firstChild is ${taskListChildren[0].firstChild.nodeType}`);
console.log(`Node type of firstElementChild is ${taskListChildren[0].firstElementChild.nodeType}`);
console.log(`Node type of lastChild is ${taskListChildren[0].lastChild.nodeType}`);
console.log(`Node type of lastElementChild is ${taskListChildren[0].lastElementChild.nodeType}`);
// Finally a children counting attribute:
console.log(`taskList has ${taskList.childElementCount} child elements`);

// Now let's do the reverse: parent attributes
console.log(taskItem1.parentNode);
console.log(taskItem1.parentElement);
// Let' get a grandparent
console.log(taskItem1.parentNode.parentNode);
// Siblings are nodes/elements that share the same parent
console.log(`taskItem1's next sibling node is ${taskItem1.nextSibling}`);
console.log(`taskItem1's next sibling element is ${taskItem1.nextElementSibling}`);
// If there is no next sibling or previous sibling, then null will be returned
console.log(taskItem1.previousElementSibling);
