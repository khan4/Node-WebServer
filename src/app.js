const hbs = require('hbs')
const path = require('path')
const express = require('express')
const forecastResult = require('./utils/forecast')
const geoCoding = require('./utils/geocode')
const app = express()


// console.log(__dirname)
// console.log(__filename)

//console.log(path.join(__dirname,'../public'))
 
 const viewsPath = path.join(__dirname,'../tempelates/views')
 const dirName = express.static(path.join(__dirname,'../public'))
 const partialsPath = path.join(path.join(__dirname,'../tempelates/partials'))
 //const aboutName = express.static(path.join(__dirname,'../public/index2.html'))

// app.get('',(req,res)=>{
//    res.send('Welcome to the world of express')
// })
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)
app.use(dirName)

app.get('',(req,res)=>{
  res.render('index.hbs',{
      name: 'Muhammad Sidique',
      age: 25
  })
})
app.get('/about',(req,res)=>{

    if(!req.query.address){

    }

    res.render('about.hbs',{
        name: 'About Us Page',
        university:'Comsats University Islamabad'
    })
})

app.get('/weather',(req,res)=>{

    if(!req.query.search){
        res.send({
            error: 'You must provide the Location'
        })
    }
    else{
        const location = req.query.search
        forecastResult(location,(error,response)=>{

        
            if(error){
               return res.send({
                    error: 'Cannot find location'
                })
            }
            
            const lat = response.latitude
            const lon = response.longitude
            geoCoding(lat,lon,(e,{country,latitude,longitude,feelslike,humidity,name}={})=>{
               
                if(!e){
                   return res.send({
                        error: 'Unable to find the location'
                    })
                }
                res.send({
                    location: country+' '+name,
                    latitude: latitude,
                    longitude: longitude,
                    feelslike: feelslike,
                    humidity: humidity
                })

            })
            

        })
    }

})

app.get('/products',(req,res)=>{

    if(!req.query.search){
       return res.send({
          error:'You must provide a query'
      })
    }
    
      res.send({
          products: [
              {
              games: 'Metal slug Games of throne',
              rating: 5
              }
          ]
      })
 
})


// app.get('/about', (req,res)=>{
//     res.send({
//         aboutName: aboutName
//     })
// })
app.get('/Info',(req,res)=>{
    res.send('This is our Info Page')
})
app.get('/Home',(req,res)=>{
    res.send({
        name:'Sidique',
        age: 25,
        game: 'cricket'
    })
})

app.get('/Info/*', (req,res)=>{
  res.render('404',{
      title:'404',
      name: 'Sidique Khan',
      error: 'Info Page not Found'
  })

})

app.get('*',(req,res)=>{

    res.render('404',{
       title:'404',
       name:'sidique khan',
       error:'Page Not Found'
    })

})

app.listen(3000, ()=>{
    console.log('Server is up and running')
})