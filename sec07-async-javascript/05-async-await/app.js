jsonPlaceHolder = new FetchHTTP("https://jsonplaceholder.typicode.com");

document.querySelector("#get-comments").addEventListener("submit", function(e){
    // First gather form input data
    const parentPostID = e.target.querySelector("#parent-post-id-1").value;
    const path = `/posts/${parentPostID}/comments`;
    
    // Query for external data
    jsonPlaceHolder.get(path)
    .then(commentsHandler)
    .catch(errorHandler);

    e.preventDefault();
})

document.querySelector("#post-blogpost").addEventListener("submit", function(e){
    let postTitle = e.target.querySelector("#blog-post-title").value;
    let postBody = e.target.querySelector("#blog-post-body").value;
    postTitle = postTitle ? postTitle : "New Untitled Post";

    const newPost = {
        title: postTitle,
        body: postBody
    }
    console.log(newPost);
    jsonPlaceHolder.post("/posts", newPost)
    .then(resp => {
        const alertMessage = `Your post "${resp.title}" is accepted with ID ${resp.id}`;
        alert(alertMessage);
    })
    .catch(errorHandler);

    e.preventDefault();
})

const badURL = "https://jsonplaceholder.typicode.com/postss";
const badPromise = new Promise((resolve, reject) => {
    fetch(badURL)
        .then(resp => {
            if (resp.ok) {
                return resp.json()
            }
        })
        .then(data => {
            resolve(data)
        })
        .catch(err => {
            reject(Error(err))
        })
})

badPromise
    .then(response => {console.log(response)})
    .catch(errorHandler);