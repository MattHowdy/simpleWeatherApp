const request = require('request')

const geoCode = (address, callback)=>{
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address)+ ".json?access_token=pk.eyJ1IjoibWF0dGhvd2R5IiwiYSI6ImNqdThjNTMxMTA1cnA0ZXBlazd6Y3YxazAifQ.gTD01cZq9XwzE_NH-EUBRw&limit=1"

    request({url, json: true}, (error, {body})=>{
        if(error)  {
            callback("Unable to connect to the GeoMap service because of:  " + error, undefined)
        }else if(body.features.length === 0 ){
            callback("Unable to find location: ", undefined)
        }else{
            callback(undefined, {
                latituted : body.features[0].center[1],
                longituted : body.features[0].center[0],
                location : body.features[0].place_name
            })
        }
    })
}

module.exports = geoCode