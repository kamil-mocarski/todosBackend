const mongoose = require('mongoose');

const ContactSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    },
    name: {
        type: String,
        require: true
    },
    surname: {
        type: String,
        require: true
    },
    phone: {
        type: Number,
       
    },
    email: {
        type: String,
        require: true
    },
    type: {
        type: String,
        default: 'personal'
    },
    date: {
        type: Date,
        default: Date.now
    }
})
module.exports = mongoose.model('contact', ContactSchema);