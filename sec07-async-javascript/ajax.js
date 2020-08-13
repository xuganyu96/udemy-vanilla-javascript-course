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
            const customerDisplay = document.createElement("ul");
            customerDisplay.innerHTML = `
                <li>${customer.id}</li>
                <li>${customer.name}</li>
            `;        
            document.querySelector("#output").appendChild(customerDisplay);
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

