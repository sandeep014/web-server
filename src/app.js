const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')

const app = express()
const port = process.env.PORT || 3000
//Define Paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewspath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')

//Setuo handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewspath)
hbs.registerPartials(partialPath)

//Setuo statis directory to serve
app.use(express.static(publicDirectoryPath))



app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Sandeep'
    })
})

app.get('/about', (req, res) => {
  res.render('about',{
    title: "About Us",
    name: 'Sandeep'
  })
})

app.get('/help', (req, res) => {
  res.render('help',{
    title: "Help",
    message:"This is Help message",
    name:"Sandeep"
  })
})

app.get('/products', (req, res) => {

  if(!req.query.search){
    return res.send({
      Error:"You have to provide Search query"
    })
  } else{
    res.send({
      products:req.query.search
    })
  }
})


app.get('/weather', (req, res) =>{
 const location = req.query.address
  if(!location){
    res.send({
      Error: "address must me provided"
    })
  } else{

    geocode(location, (error, {latitude, longitude, location} = {}) => {
      //console.log(error+test)
      if(error){
        return res.send({Error: error})
      }
          forecast(latitude, longitude, (error, forecastData) =>{
            if(error){
            return  res.send({Error: error})
            }
              res.send({
                location: location,
                forecast: forecastData,
                address: req.query.address
              })

          })
    })
  }
})




// --------Managing 404 Errors-------------
app.get('/about/*',(req, res) =>{
  res.render('404',{
    title:"Error:404",
    body:"About page not found",
    name:"Sandeep"
  })
})


app.get('/help/*',(req, res) =>{
  res.render('404',{
    title:"Error:404",
    body:"Help page not found",
    name:"Sandeep"
  })
})

app.get('*',(req, res) =>{
  res.render('404',{
    title:"Error:404",
    body:"Page not found",
    name:"Sandeep"
  })
})

app.listen(port, () => {
    console.log('Server is up on port '+ port+".")
})
