jsonPlaceHolder = new FetchHTTP("https://jsonplaceholder.typicode.com");

document.querySelector("#get-comments").addEventListener("submit", function(e){
    const parentPostID = e.target.querySelector("#parent-post-id-1").value;
    const path = `/posts/${parentPostID}/comments`;
    jsonPlaceHolder.get(path);

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
    jsonPlaceHolder.post("/posts", newPost);

    e.preventDefault();
})

