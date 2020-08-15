/*
This script contains a simple class called EasyHTTP, that has four methods attached to it: get, post, put, and delete, 
each of which correponds to its namesake counterpart in a RESTful API
*/

function EasyHTTP(domain){
    this.domain = domain;
    this.http = new XMLHttpRequest();
}

EasyHTTP.prototype.get = function(path, callback) {
    const url = this.domain + path 
    this.http.open("GET", url, true);

    let self = this;
    this.http.onload = function() {
        if(self.http.status === 200) {
            callback(null, JSON.parse(self.http.responseText));
        } else {
            callback(`Error: ${self.http.status}`)
        }
    }

    this.http.send();
}

EasyHTTP.prototype.post = function(path, data, callback) {
    const url = this.domain + path;
    const postText = JSON.stringify(data);
    this.http.open("POST", url, true)
    this.http.setRequestHeader("Content-type", "application/json");

    let self = this;
    this.http.onload = function() {
        callback(null, JSON.parse(self.http.responseText));
    }

    this.http.send(postText)
}

EasyHTTP.prototype.put = function(path, data, callback) {
    const url = this.domain + path;
    const postText = JSON.stringify(data);
    this.http.open("PUT", url, true)
    this.http.setRequestHeader("Content-type", "application/json");

    let self = this;
    this.http.onload = function() {
        callback(null, JSON.parse(self.http.responseText));
    }

    this.http.send(postText)
}

EasyHTTP.prototype.delete = function(path, callback) {
    const url = this.domain + path 
    this.http.open("GET", url, true);

    let self = this;
    this.http.onload = function() {
        if(self.http.status === 200) {
            callback(null, JSON.parse(self.http.responseText));
        } else {
            callback(`Error: ${self.http.status}`)
        }
    }

    this.http.send();
}