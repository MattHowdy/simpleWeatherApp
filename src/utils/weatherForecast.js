const request = require('request')


const weatherForecast = (lat, long, callback)=>{
    const url = `https://api.darksky.net/forecast/e7ce982687c593bb3a390f0dd5ac587e/${lat},${long}?units=si`
    
    request({ url, json : true}, (error, {body}) =>{
            if(error) {
                callback("Unable to connect to the weather service", undefined)
            }else if(body.error){
                callback("Unable to find location", undefined)
            }else{
                const temperature = body.currently.temperature
                const chanceOfRain = body.currently.precipProbability
                const summary = body.daily.data[0].summary
                const high = body.daily.data[0].temperatureHigh
                const low = body.daily.data[0].temperatureLow
                callback(undefined,` ${summary} It is currently ${temperature} degrees. The lowest temperature for today may be ${low} while the high may react ${high}. The chance of rain is ${chanceOfRain}.`)
            }
        })

}





module.exports = weatherForecast