const mongoose = require('mongoose')
const {paymentStatus} = require('../utils/constants')

const paymentSchema = new mongoose.Schema({
    bookingId : {
        type : mongoose.SchemaTypes.ObjectId,
        required : true,
        ref : 'Booking'
    },
    amount : {
        type : Number,
        required : true
    },
    status : {
        type : String,
        required : true,
        default : paymentStatus.pending
    },
    createdAt : {
        type : Date,
        immutable : true,
        default : () => Date.now()
    },
    updatedAt : {
        type : Date,
        default : () => Date.now()
    }
});

module.exports = mongoose.model('Payment', paymentSchema);