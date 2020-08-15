const getDataButton = document.querySelector("#get-data")

// In this section we talk about AJAX and XHR. There are two things to pay attention to:
// One is the readyState of the xhr object, and the other is the response status.
// readState is an integer:
// 0:   request not initialized
// 1:   server connection established
// 2:   request received (note that because HTTPS is transmitted over TCP there is an "acknowledgement")
// 3:   processing request
// 4:   request finished and response is ready
// 
// HTTP response code 200 is "OK"; there are more


// Example 1: a legacy implementation
function getData(e) {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "data.txt", true);

    // Every time the xhr object's readState is changed, check if it is 4, then post it
    xhr.onreadystatechange = function(){
        if(this.status === 200 && this.readyState === 4){
            console.log(this.responseText);
        }
    }
    xhr.send()
}

// Example 2: newer implementation
getDataButton.addEventListener('click', function(e){
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "data.txt", true);

    // In newer implementation we can use .onload method to skip checking for readyState 4
    xhr.onload = function(){
        if(this.status === 200){
            document.querySelector("#output").innerHTML = `<h1>${this.responseText}</h1>`
        }
    }
    // this corresponds to readyState 3; can be useful for the spinning loading screen
    xhr.onprogress = function(){
        console.log(this.readyState)
    }
    // And if anything goes wrong
    xhr.onerror = function(){
        console.log("ERROR!")
    }
    // xhr.send()
})

// Example 3: Working with JSON:
getDataButton.addEventListener('click', function(e){
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "customer.json", true);

    // In newer implementation we can use .onload method to skip checking for readyState 4
    xhr.onload = function(){
        if(this.status === 200){
            const customer = JSON.parse(this.responseText);
            const outputContainer = document.querySelector("#output")
            const customerDisplay = `
            <ul>
                <li>${customer.id}</li>
                <li>${customer.name}</li>
            </ul>
            `;
            outputContainer.innerHTML = customerDisplay
        }
    }
    // this corresponds to readyState 3; can be useful for the spinning loading screen
    xhr.onprogress = function(){
        console.log(this.readyState)
    }
    // And if anything goes wrong
    xhr.onerror = function(){
        console.log("ERROR!")
    }
    // xhr.send()
})

// Example 4: Some issues with asynchronous JavaScript, and how we can use callback to address those issues
const blogPosts = [
    {postID: 1, postTitle: "Blog Post 1"},
    {postID: 2, postTitle: "Blog Post 2"}
]
function pushPost(newPost){
    setTimeout(function(){
        blogPosts.push(newPost);
    }, 2000)
}
function displayPosts(){
    const outputContainer = document.querySelector("#output")
    const outputCollection = document.createElement("ul");
    outputCollection.className = "collection"
    outputContainer.appendChild(outputCollection);
    setTimeout(function(){
        blogPosts.forEach(function(value){
            const postDisplay = document.createElement("li");
            postDisplay.className = "collection-item";
            postDisplay.innerText = value.postTitle;
            outputCollection.appendChild(postDisplay);
        })
    })
}
getDataButton.addEventListener('click', function(e){
    // With this implementation, the display will be instant, but post 3 will be missing because displayPosts() 
    // finished before post 3 is pushed onto the blogPost array

    // pushPost({postID: 3, postTitle: "Blog Post 3"});
    // displayPosts();
})

/*
In the example above, we are emulating a situation in which the front-end is communicating with a separate backend that
could take significant time to process requests. As shown above, pusing a post to the backend is emulated to to happen 
2 seconds after the pushPost() method is called, while displayPosts happens instantly. As a result, displayPosts 
happens before the post was pushed to the post array, so the third post will not be displayed, despite that pushPost 
is called before displayPosts. This is some kind of race conditions.

One way to fix it is by asking the pushPost to run displayPosts again after it finished its original task. Here is the 
implementation with proper callback:
*/
function pushPostCallback(newPost, callback){
    setTimeout(function() {
        blogPosts.push(newPost);
        callback()
    }, 2000);
}

getDataButton.addEventListener('click', function(e){
    // With this implementation, after hitting the button, there will be a 2 second delay before the full set of posts 
    // are displayed correctly
    pushPostCallback({postID: 4, postTitle: "Blog Post 4"}, displayPosts);
})
