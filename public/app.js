const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const message1 = document.querySelector('#message_1')
const message2 = document.querySelector('#message_2')

weatherForm.addEventListener('submit',(e)=>{
  e.preventDefault()
  const location = search.value
  showLocation(location)
})

function showLocation(loc){

    message1.textContent = "Loading..."

    fetch('http://localhost:3000/weather?search='+loc).then((response)=>{
    response.json().then((data)=>{
    
    if(data.error){
        message1.textContent =""
        message2.textContent = "Unable to find the location"
    }
    else{
        message1.textContent = " Location : "+data.location+ " Feels Like : "+data.feelslike
    }
})
})
}