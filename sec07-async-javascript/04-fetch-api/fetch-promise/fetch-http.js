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
        // Given a path, return a Promise that resolves to JSON data
        const url = this.domain + path;
        return new Promise((resolve, reject) => {
            fetch(url)
            .then(resp => {
                if(resp.ok) {
                    // If the response is okay, don't resolve just yet; we might still need to wait for data;
                    // return the json() method call, which itself is a Promise, and let it resolve on its own
                    return resp.json();
                } else {
                    const errMsg = `${url} responded with status ${resp.status}`;
                    reject(Error(errMsg));
                }
            })
            .then(data => {
                resolve(data);
            })
            .catch(err => {
                reject(Error(err));
            })
        })
    }

    post(path, data) {
        // Given a path and an object to be sent, return a Promise that resolves to the JSON data that is included in 
        // the response from the URL 
        const url = this.domain + path;
        return new Promise((resolve, reject) => {
            fetch(url, {
                method: "POST",
                headers: {"Content-type": "application/json"},
                body: JSON.stringify(data)
            })
            .then(resp => {
                if(resp.ok) {
                    return resp.json();
                } else {
                    const errMsg = `${url} responded with status ${resp.status}`;
                    reject(Error(errMsg));
                }
            })
            .then(data => {
                resolve(data);
            })
            .catch(err => {
                reject(Error(err));
            })
        })
    }

    // PUT and DELETE are highly similar to that of POST so I am skipping those two to save time
}