const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const serverConfig = require('./configs/server.config')
const dbConfig = require('./configs/db.config')
const User = require('./models/user.model')
const bcrypt = require('bcryptjs')
const constants = require('./utils/constants')
const cors = require('cors')

const app = express()

app.use(bodyParser.json())
app.use(cors())

async function init(){
    let user = await User.findOne({
        userId : "admin"
    });

    if(user){
        console.log("Admin User already exists!", user);
        return;
    }

    try{
        const user = await User.create({
            name : "Admin",
            userId : "admin",
            email : "admin@gmail.com",
            password : bcrypt.hashSync("adminpwd", 8),
            userType : constants.userTypes.admin,
            userStatus : constants.userStatus.approved
        });

        console.log("Admin user created successfully!");
    } catch(err){
        console.log("Error in creating admin user", err.message);
    }
}

mongoose.connect(dbConfig.DB_URL, () => {
    console.log('Connected to MongoDB');
    init();
}, err => {
    console.log('Error while connecting to MongoDB', err.message)
})

require('./routes/movie.route')(app)
require('./routes/theatre.route')(app)
require('./routes/auth.route')(app)
require('./routes/user.route')(app)
require('./routes/booking.route')(app)
require('./routes/payment.route')(app)

app.get('/', (req, res) => {
    res.status(200).send("Inside Movie Booking Application")
})

app.listen(serverConfig.PORT, () => {
    console.log(`Application running on the port ${serverConfig.PORT}`);
})