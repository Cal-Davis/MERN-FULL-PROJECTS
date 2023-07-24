require('dotenv').config()
const express = require('express')
const app = express()

//---importing custom middleware
const errorHandler = require('./middleware/errorHandler')
const {logger ,logEvents} = require('./middleware/logger')

//--Third part middleware
const cookieParser = require('cookie-parser')

const cors = require('cors')
const corsOptions = require('./config/corsOptions')
const PORT = process.env.PORT || 3500
const path = require('path')
const connectDB = require('./config/dbConn')
const mongoose = require('mongoose')



console.log(process.env.NODE_ENV)

//Calling the function that connects to the database
connectDB()

//MIDDLEWARE
app.use(logger)

app.use(cors(corsOptions))

//This middleware enables the server to process json
app.use(express.json())

//Adding third party middleware
app.use(cookieParser())

app.use('/' , express.static(path.join(__dirname ,'public')))

app.use('/' , require('./routes/root'))
app.use('/users' , require('./routes/userRoutes'))

app.all('*', (req, res) => {
    res.status(404)
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'views' , '404.html'))
    } else if (req.accepts('json')) {
        res.json({ message: '404 Not Found' })
    } else {
        res.type('txt').send('404 Not Found') 
        
    }
})

//custom middleware
app.use(errorHandler)

mongoose.connection.once('open' , () => {
    console.log('Connected to MongoDB')
    //listen for requests
    app.listen(PORT , () => console.log(`Server running on port ${PORT}`))
       
})

mongoose.connection.on('error' , err => {
    console.log(err)
    logEvents(`${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`, 'mongoErrLog.log')
})
