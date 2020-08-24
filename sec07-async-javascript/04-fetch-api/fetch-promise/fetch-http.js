function responseHandler(response) {
    // Handle the response and return data if there is data; log error if there is error
    if(response.ok) {
        // I know that the returned data will be JSON so it's okay to just give JSON
        return response.json()
    } else {
        throw Error(`${response.url} returned status ${response.status}`);
    }
}

function errorHandler(err) {
    // Handle the error gracefully
    console.log(`${err}\nbut the error was handled gracefully`);
}

function postResponseHandler(response) {
    const alertMessage = `Your post "${response.title}" is accepted with ID ${response.id}`;
    alert(alertMessage);
}

function commentsHandler(comments) {
    // comments is an Array of JSON objects
    const commentsCollection = document.querySelector("ul");
    while(commentsCollection.firstChild){
        commentsCollection.firstChild.remove();
    }

    comments.forEach(function(comment){
        const commentListing = document.createElement("li");
        const username = comment.email.split("@")[0];
        commentListing.innerHTML = `<strong><em>${username}</em></strong> says: <br>"${comment.body}"`
        commentsCollection.appendChild(commentListing)
    })
    document.querySelector(".comments-display h2").innerHTML = `
        Comments for post ${comments[0].postId}
    `
}

class FetchHTTP {
    // A re-creation of the EasyHTTP API for GET, POST, PUT, and DELETE onto JSON Place Holder dummy API

    constructor(domain) {
        this.domain = domain;
    }    

    get(path) {
        const url = this.domain + path;
        const getResponse = fetch(url);
        getResponse
        .then(responseHandler)
        .then(commentsHandler)
        .catch(errorHandler)
    }

    post(path, data) {
        const url = this.domain + path;
        const postResponse = fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        })

        postResponse
        .then(responseHandler)
        .then(postResponseHandler)
        .catch(errorHandler)
    }
}