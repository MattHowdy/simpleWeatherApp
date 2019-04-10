console.log("Client side js file loaded")


const weathetForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weathetForm.addEventListener('submit', (event)=>{
    event.preventDefault()
    const location = search.value
    const url = 'http://localhost:3000/weather?address='+location

    
    messageOne.textContent = "Loading..."
    messageTwo.textContent = ""

    fetch(url).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            messageOne.textContent = data.error
            console.log(data.error)
        }else{
            messageOne.textContent = data.location
            messageTwo.textContent = data.forecast 
            console.log(data.location)
            console.log(data.forecast)
        }      
    })
})

})