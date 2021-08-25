const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()
app.use(bodyParser.json())
app.use(cors())

mongoose.connect(proces.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: ture})

app.get('*',(req,res)=>
{
    res.send('chanchito feliz')
})

module.exports = app