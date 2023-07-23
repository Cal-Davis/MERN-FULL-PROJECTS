const mongoose = require('mongoose')

const Schema = mongoose.Schema

const workoutSchema = new Schema({
    title:{
        type: String,
        required: true
    },
    reps:{
        type:Number,
        required: true
    },
    load:{
        type:Number,
        required:true
    }

}, {timestamps:true})


//workout is the name of the model ....while workoutSchema is the schema created in the model

module.exports = mongoose.model('workout' , workoutSchema)

