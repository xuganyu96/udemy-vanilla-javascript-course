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
