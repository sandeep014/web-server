const request = require('request')


const forecast = (latitude, longitude, callback) =>{
  const url = "http://api.weatherstack.com/current?access_key=a7b2465c93cecfb7e1f8ea42edb8fb6b&query="+latitude+","+longitude+""

  request({url, json:true},(error,{body}) =>{
    if(error){
      callback("Unable to connect with forecast service", undefined)
    } else if(body.current.length ===0){
      callback("Results not found for given search, Please try again with another search", undefined)
    } else{
      callback(undefined,{
        Temperature: body.current.temperature,
        Feels_Like: body.current.feelslike,
        Condition: body.current.weather_descriptions[0]
      })
    }
  })

}


module.exports = forecast
