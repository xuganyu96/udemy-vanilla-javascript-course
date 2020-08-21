// Let's review some ES5 callback!
const jsonPlaceHolder = new EasyHTTP("https://jsonplaceholder.typicode.com")
const blogPhotos = []

function getAllPosts() {
    jsonPlaceHolder.get('/photos', function(err, resp){
        if(err) {
            console.log(`ERROR: ${err}`);
        } else {
            // resp will be an array of objects
            resp.forEach(function(blogPost){
                blogPhotos.push(blogPost);
            })
        }
    });
}

function logPhotoCount() {
    console.log(`Current photo count: ${blogPhotos.length}`);
}

// in the function getAllPosts() above, we asked for all 5000 photos to be queried, and the GET request is handled 
// asynchronously so despite that getAllPosts() is called before console.log, console.log will actually finish first, 
// which means that console.log will print "0".
// getAllPosts();
// logPhotoCount();
// In ES5 the solution is to pass the function that needs to run after the async function call into the async function
// to enforce synchronous actions:
function getAllPosts(then) {
    // After the call is complete, call then()
    jsonPlaceHolder.get('/photos', function(err, resp){
        if(err) {
            console.log(`ERROR: ${err}`);
        } else {
            // resp will be an array of objects
            resp.forEach(function(blogPost){
                blogPhotos.push(blogPost);
            })
        }
        if(then) {
            then();
        }
    });
}
// getAllPosts(logPhotoCount)

// Now in ES6, there exists a "Promise" object that has a .then() method that takes a function call:
const newPromise = new Promise(function(resolve, reject){
    // Call resolve to fulfill the promise; call reject (with an error message) to declare a promise not fulfilled
    resolve();
})
newPromise.then(function(){console.log("What then, after the promise is resolved?")});
// Here is an example:
function promiseAllPhotos() {
    return new Promise(function(resolve, reject) {
        jsonPlaceHolder.get('/photos', function(err, resp){
            // Simulate a possible failure here:
            if(Math.random() > 0.5) {
                err = "Oops";
            }
            if(err) {
                reject(`ERROR: ${err}`);
            } else {
                // resp will be an array of objects
                resp.forEach(function(blogPost){
                    blogPhotos.push(blogPost);
                })
                resolve()
            }
        });
    })
}
function logError(err){
    console.log(err);
}
// By calling then and catch, we are enforcing synchronous execution of the method calls within then and catch after 
// the execution of the function within the Promise object
promiseAllPhotos().then(logPhotoCount).catch(logError);


