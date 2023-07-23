require('dotenv').config()
//importing express
const express = require('express')
const workoutRoutes = require('./routes/workouts')
const mongoose = require('mongoose')



//express app
const app = express()

//middleware
app.use(express.json())
app.use((req ,res , next)=>{
    console.log(req.path , req.method)
    next()
    
})


//routes
app.use('/api/workouts' ,workoutRoutes)

//connect to database
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
    //listen for requests
    app.listen(process.env.PORT ,()=>{
        console.log('Connecting to db and listening on server', process.env.PORT)
})
})
    .catch((error) =>{
    console.log(error)
})


    



