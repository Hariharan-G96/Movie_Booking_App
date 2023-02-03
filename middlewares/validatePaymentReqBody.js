const Booking = require('../models/payment.model')
const ObjectId = require('mongoose').Types.ObjectId

validatePaymentRequestBody = async (req, res, next) => {
    // Validate whether the booking id is passed
    if(!req.body.bookingId){
        return res.status(400).send({
            message : "Failed! Booking Id is mandatory"
        });
    }

    // Validate the given booking id is an objectId
    if(ObjectId.isValid(req.body.bookingId)){
        return res.status(400).send({
            message : "Failed! Booking Id provided is in invalid format"
        });
    }

    // Validate whether the booking id exist in db
    const booking = await Booking.findOne({
        _id : req.body.bookingId
    });

    if(!booking){
        return res.status(400).send({
            message : "Failed! Booking Id does not exist"
        });
    }
    
    // Validate whether the amount is provided
    if(!amount){
        return res.status(400).send({
            message : "Failed! Payment Amount is mandatory"
        });
    }

    next();
}

module.exports = {
    validatePaymentRequestBody
}