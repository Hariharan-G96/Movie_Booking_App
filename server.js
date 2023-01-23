const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const serverConfig = require('./configs/server.config')
const dbConfig = require('./configs/db.config')

const app = express()

app.use(bodyParser.json())

mongoose.connect(dbConfig.DB_URL, () => {
    console.log('Connected to MongoDB')
}, err => {
    console.log('Error while connecting to MongoDB', err.message)
})

require('./routes/movie.route')(app)
require('./routes/theatre.route')(app)

app.get('/', (req, res) => {
    res.status(200).send("Inside Movie Booking Application")
})

app.listen(serverConfig.PORT, () => {
    console.log(`Application running on the port ${serverConfig.PORT}`);
})