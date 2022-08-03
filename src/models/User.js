const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    fullName: {
        type: String,
        default: ''
    },
    address: {
        type: String,
        default: ''
    },
    gender: {
        type: Boolean,
        default: true
    },
    phone: {
        type: String,
        default: ''
    },
    birthDate:{
        type: String,
        default: ''
    },
    status:{
        type: Boolean,
        default: true
    }

})


module.exports = mongoose.model('User', userSchema)