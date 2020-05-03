const request = require('request')

const geoCoding = (lat,lon,callBack)=>{
    const url ='http://api.weatherstack.com/current?access_key=97fb91227f7bfe23e5b836032cedc19d&query='+lon+','+lat;

    request({url:url, json: true} , (error, response) =>{

         if(error){
              callBack('Check your internet connection',undefined)
            }
         else if(response.body.success === false){
           callBack('Cannot Find Location',undefined)
         }
         else if(response.body.request != undefined){
              callBack('success',{
                   name: response.body.location.name,
                   country: response.body.location.country,
                   latitude: response.body.location.lat,
                   longitude: response.body.location.lon,
                   feelslike: response.body.current.feelslike,
                   humidity: response.body.current.humidity
              })
         }
    })
}

module.exports = geoCoding