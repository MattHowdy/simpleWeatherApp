const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geoCode = require('./utils/geoCode')
const weatherForecast = require('./utils/weatherForecast')

const app = express()
const port = process.env.PORT || 3000

// define path for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewPaths = path.join(__dirname, '../templates/views')
const partialsPaths = path.join(__dirname, '../templates/partials')


// setup handlbars engine and views location
app.set("view engine", 'hbs')
app.set("views", viewPaths)
hbs.registerPartials(partialsPaths)

// setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res)=>{

    res.render('index', {
        title : "Weather",
        name : "Matt"
    })
})

app.get('/about', (req, res)=>{
    res.render('about', {
        title : "about",
        name : "Matt"
    })
})


app.get('/help', (req, res)=>{
    res.render('help', {
        title : "Help",
        message : "No need to for help",
        name : "Matt"
    })
})


app.get('/weather', (req, res)=>{
    const address = req.query.address
    if(!address){
        return res.send({
            error: "No address was provided"
        })
    }

    geoCode(address, (error, {latituted, longituted, location} = {})=>{
        if(error) return res.send({error})
        weatherForecast(latituted, longituted,  (error, forecastData) => {
            if(error) return res.send({error})
            res.send({
                forecast : forecastData,
                location,
                address
            })
        })
    })
})



app.get('/products', (req, res)=>{
    // ERROR => Cannot set headers after they are sent to the client => IT MEANS THAT RES.SEND FIRED TWICE
    if(!req.query.search){
        return res.send({
            error : 'You must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products : [],
    })
})


app.get("/help/*", (req,res)=>{
    res.render('errorpage', {
        title : 404,
        errorMessage : "Help article not found",
        name : "Matt"
    })
})

app.get("*", (req,res)=>{
    res.render('errorpage', {
        title : 404,
        errorMessage : "Page not found",
        name : "Matt"
    })
})



app.listen(port, ()=>{
    console.log("App is running on "+ port)
})