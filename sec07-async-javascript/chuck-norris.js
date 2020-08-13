const jokesCollection = document.querySelector(".collection");
jokesCollection.clear = function(){
    while(this.firstChild){
        this.firstChild.remove();
    }
}

document.querySelector("#joke-form").addEventListener("submit", function(e){
    const inputNumber = e.target.querySelector("#n-jokes").value
    const jokeNumber = (inputNumber.length === 0) ? 1 : inputNumber;
    if(jokeNumber.length != 0){
        const endpoint = `http://api.icndb.com/jokes/random/${jokeNumber}`

    const xhr = new XMLHttpRequest();
    xhr.open("GET", endpoint, true);

    xhr.onprogress = function(){
        jokesCollection.clear();
        jokesCollection.innerText = "Jokes in transit..."
    }

    xhr.onload = function(){
        if(this.status === 200){
            jokesCollection.clear();
            const response = JSON.parse(this.response);
            const jokes = response.value

            jokes.forEach(function(value){
                const joke = document.createElement('li');
                joke.className = "collection-item"
                joke.innerText = value.joke;
                jokesCollection.appendChild(joke)
            })
        }
    }

    xhr.send()
    }
    e.preventDefault();
})