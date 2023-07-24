const mongoose = require('mongoose')
const Autoincrement = require('mongoose-sequence')(mongoose)

const noteSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref:'User'
    },
    text: {
        type: String,
        required: true
    },
    completed: {
        type: Boolean,
        default: false
    }
},
{
    timestamps:true
}
)
//This pluggin/dependency has been required from mongoose-sequence
noteSchema.plugin(Autoincrement, {
    inc_field:'ticket',
    id:'ticketNums',
    start_seq:500
})

module.exports = mongoose.model('Note', noteSchema)