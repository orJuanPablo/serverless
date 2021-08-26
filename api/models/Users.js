const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Users = mongoose.model('User', new Schema(
    {
        email: String,
        password: String,
        salt: String,
        role: {Type: String, default: 'user'}
    }
))

module.exports = Users