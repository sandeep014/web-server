console.log("Client Side JS is running")



const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const msg1 = document.querySelector('#p1')
const msg2 = document.querySelector('#p2')



  weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value

    msg1.textContent = "Loading..."
    msg2.textContent = ""


     fetch('/weather?address='+location).then((response)=>{
       response.json().then((data) =>{

          if (data.Error) {
            msg1.textContent = data.Error
          } else {
            msg1.textContent = "Location: "+data.location
            msg2.textContent = "Temperature: "+data.forecast.Temperature
          }
       })

     })

  })
