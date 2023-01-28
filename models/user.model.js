const mongoose = require('mongoose');
const constants = require('../utils/constants')

const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    userId : {
        type : String,
        required : true,
        unique : true
    },
    email : {
        type : String,
        required : true,
        lowercase : true,
        unique : true,
        minLength : 10
    },
    password : {
        type : String,
        required : true
    },
    userType : {
        type : String,
        required : true,
        default : constants.userTypes.customer,
        uppercase : true
    },
    userStatus : {
        type : String,
        required : true
    }
});

module.exports = mongoose.model('User', userSchema);