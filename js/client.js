document.querySelector('#clickMe').addEventListener('click', makeReq)

function makeReq(){
let output = document.querySelector('#result')
let userInput = document.querySelector('#userName').value;

if(!userInput){
    output.innerHTML = "Please enter a word!"
    return
}


fetch(`/api?word=${userInput}`)
    .then(res => res.json())
    .then(data => {
        console.log(data)
        output.innerHTML = data.results
    })

    .catch(err => {
        console.log(err)
    })

}