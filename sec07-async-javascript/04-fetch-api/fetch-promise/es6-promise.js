/*
ES6 introduces the concept of promise for cleaner async actions, and the fetch API for querying resources.

A Promise object abstracts a sequence of statements that are asynchronously executed. Once the sequence of statements 
finish execution, the Promise object can be defined to return another object for use. 
*/
const coinFlip = new Promise(function(resolve, reject) {
    setTimeout(
        function(){
            let flipHead = Math.random() < 0.5
            if(flipHead) {
                resolve("Got a head");
            } else {
                resolve("Got a tail");
            }
        }, 2000
    )
})

// When constructing a promise, call "resolve" to indicate that the Promise has been fulfilled. In the example above, 
// coinFlip will resolve to a resolution string, and the resolution can be accessed within a "then" method call
coinFlip.then(
    resolution => {
        // console.log(resolution)
    }
);

// A Promise is not always successfully fulfilled; if a Promise cannot be fulfilled, then call "reject" to indicate the 
// failure. For best practice, pass in an Error object so as to get a stack trace.
const strictCoinFlip = new Promise(function(resolve, reject) {
    setTimeout(
        function() {
            let flipHead = Math.random() < 0
            if(flipHead) {
                resolve("Got a head");
            } else {
                reject(Error("This coin flip is rigged to fail"))
            }
        }, 2000
    )
})

// Notice here we have a .catch metho call, which is used for handling the Error object that we throw at the definition 
// of the Promise object. Without the catch, JavaScript runtime will complain about "uncaught exceptions"
strictCoinFlip
.then(
    (resolution) => {
        // console.log(resolution)
    }
)
.catch(
    (reason) => {
        // console.log(`${reason}, but the error is gracefully handled`)
    }
)

// The "then" function call can return a object, which in turn can be used in the next "then" function call. This is 
// called Promise chaining. Promise chaining is most easily explained with a fetch call 
const comments = []
const getComments = fetch("https://jsonplaceholder.typicode.com/comments");
// The fetch method returns a Promise object, which you are chain the first "then" onto for catching a Reponse object 
getComments
.then(
    response => {
        // The first "then" call takes the response object and check its status code.
        if(response.ok) {
            return response.json()
        } else {
            throw Error(`${response.url} responded with status code ${response.status}`);
        }
    }
)
.then(
    json => {
        // The second "them" call takes what is returned by the first then call and do things 
        json.forEach(function(comment){
            if(comments.length < 10) {
                comments.push(comment);
            }
        })
        console.log(`${comments.length}/${json.length} comments loaded`)
    }
)
.catch(
    err => {
        console.log(`${err} \nbut the error was handled gracefully`);
    }
)
