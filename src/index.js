const quotes= document.getElementById("quote-list")
const form = document.getElementById("new-quote-form")


fetch("http://localhost:3000/quotes?_embed=likes")
.then(response => response.json())
.then(data => {
    data.forEach(quote => {
        createQuote(quote)
    });
})
function createQuote(elem){
    let li = document.createElement('li')
    li.innerHTML = `
    <blockquote class="blockquote">
    <p class="mb-0">${elem.quote}</p>
    <footer class="blockquote-footer">${elem.author}</footer>
    <br>
    <button id="like" class='btn-success'>Likes: <span>${elem.likes.length}</span></button>
    <button id="delete" class='btn-danger'>Delete</button>
    </blockquote>
    `
    quotes.appendChild(li)

    li.querySelector('#delete').addEventListener('click', ()=>{
        li.remove()
        deleteItem(elem.id)
    })
    li.querySelector('#like').addEventListener('click', ()=>{
        let span = li.querySelector('span')
        likeItem(elem.id, span )
    })
}

form.addEventListener("submit", (e) => {
    e.preventDefault()
    let data = {
        quote: e.target.quote.value,
        author: e.target.author.value,
        likes: []
    }
    newQuote(data)
})

function newQuote(data) {
    fetch("http://localhost:3000/quotes?_embed=likes", {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => createQuote(data))
}

function deleteItem(id){
    fetch(`http://localhost:3000/quotes/${id}`, {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(response => response.json())
    .then(data => console.log(data))
}
function likeItem(quoteId, span){
    fetch(`http://localhost:3000/likes?quoteId=${quoteId}`, {
        method: 'POST', 
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            quoteId: quoteId,
        })
        
    })
    span.innerText = parseFloat(innerText)+1
    .then(response => response.json())
    .then(data => {
        console.log(data)
    })   
}
