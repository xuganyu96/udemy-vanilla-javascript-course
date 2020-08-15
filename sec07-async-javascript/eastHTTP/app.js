const jsonPlaceHolder = new EasyHTTP("https://jsonplaceholder.typicode.com")


document.querySelector("#get-blogpost-args").addEventListener("submit", function(e) {
    e.preventDefault();
    const postID = e.target.querySelector("#get-blogpost-id-input").value;
    const endpoint = `/posts/${postID}`;
    console.log(endpoint);

    jsonPlaceHolder.get(endpoint, function(err, response) {
        // If there is an error, then console log the error; if there is no error, then display the post
        if(err) {
            alert(err);
        } else {
            const postContainer = document.querySelector(".blogpost-display-container");
            while(postContainer.firstChild) {
                postContainer.firstChild.remove();
            }
    
            const newPost = document.createElement("div");
            const newPostTitle = document.createElement("h3");
            const newPostBody = document.createElement("span");
            newPostTitle.appendChild(document.createTextNode(`${response.id}: ${response.title}`));
            newPostBody.appendChild(document.createTextNode(response.body))
            newPost.appendChild(newPostTitle);
            newPost.appendChild(newPostBody);
    
            postContainer.appendChild(newPost);
        }
    });
})


document.querySelector("#post-blogpost-args").addEventListener("submit", function(e) {
    e.preventDefault();

    const postTitle = e.target.querySelector("#post-blogpost-title-input").value;
    const postBody = e.target.querySelector("#post-blogpost-body-input").value;
    const postData = {title: postTitle, body: postBody};

    jsonPlaceHolder.post("/posts", postData, function(err, response){
        if(err) {
            alert(err);
        } else {
            alert(`New post created with ID ${response.id}`)
        }
    });
})


document.querySelector("#put-blogpost-args").addEventListener("submit", function(e) {
    e.preventDefault();

    const postID = e.target.querySelector("#put-blogpost-id-input").value;
    const postTitle = e.target.querySelector("#put-blogpost-title-input").value;
    const postBody = e.target.querySelector("#put-blogpost-body-input").value;
    const postData = {id: postID, title: postTitle, body: postBody};

    jsonPlaceHolder.put(`/posts/${postID}`, postData, function(err, response){
        if(err) {
            alert(err);
        } else {
            alert(`Post with ID ${response.id} updated`)
        }
    })
})


document.querySelector("#delete-blogpost-args").addEventListener("submit", function(e) {
    e.preventDefault();

    const postID = e.target.querySelector("#delete-blogpost-id-input").value;

    jsonPlaceHolder.delete(`/posts/${postID}`, function(err, response){
        if(err) {
            alert(err);
        } else {
            alert(`Post with ID ${response.id} deleted`)
        }
    })
})
