const request = require('request')

const forecastResult = (name,callBack)=>{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+name+'.json?limit=1&access_token=pk.eyJ1IjoibXVoYW1tYWRzaWRpcXVlIiwiYSI6ImNrOHhscGpscjAyYnczaHJ1MG1rNDlxczQifQ.GseLectOjnNd7XZ8eUxVdg'
    request({url:url, json:true}, (error,response)=>{

         if(error){
           callBack('There is No internet Connection',undefined)
         }
         else if (response.body.features.length === 0){
          callBack('Unable to fetch data from weather forecast',undefined)
         }
         else if(response.body.features.length > 0){
           callBack(undefined,{
               placeName : response.body.features[0].place_name,
               latitude : response.body.features[0].center[0],
              longitude : response.body.features[0].center[1]
           })
         }
    })

}


module.exports = forecastResult