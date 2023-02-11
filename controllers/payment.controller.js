const Payment = require('../models/payment.model')
const Booking = require('../models/booking.model')
const constants = require('../utils/constants')
const User = require('../models/user.model')
const notificationClient = require('../utils/NotificationClient')
const { paymentSuccess } = require('../scripts/emailScripts')

exports.createNewPayment = async (req, res) => {
    const savedBooking = await Booking.findOne({
        _id : req.body.bookingId
    });

    const bookingTime = savedBooking.createdAt;
    const paymentTime = Date.now();

    const timeInMinutes = (((paymentTime - bookingTime) / 1000) / 60);

    if(timeInMinutes > 5){
        savedBooking.status = constants.bookingStatus.expired;
        await savedBooking.save();
        return res.status(400).send({
            message : "Can't do payment as the booking has been expired!"
        });
    }

    // Make a call to RazorPay API
    // Return a response
    // Response will have the status of the payment

    const razorPayAPIResponse = {
        paymentStatus : constants.paymentStatus.success
    };

    const paymentObj = {
        bookingId : req.body.bookingId,
        amount : savedBooking.totalCost,
        status : razorPayAPIResponse.paymentStatus
    }

    try{
        const payment = await Payment.create(paymentObj);

        savedBooking.status = (paymentObj.status == constants.paymentStatus.success) ? 
                               constants.bookingStatus.completed : constants.bookingStatus.failed;
        
        await savedBooking.save();

        const savedUser = await User.findOne({ // For sending Email
            userId : req.userId
        });

        const {subject, html, text} = paymentSuccess(savedUser, savedBooking, payment);
        notificationClient.sendEmail([savedUser.email], subject, html, text);

        res.status(201).send(payment);
    } catch(err){
        console.log("Error while processing a payment", err.message);
        res.status(500).send({
            message : "Some internal error while processing the payment!"
        });
    }
}

exports.getAllPayments = async (req, res) => {
    const savedUser = await User.findOne({
        userId : req.userId
    });

    const queryObj = {};

    if(savedUser.userType == constants.userTypes.admin){

    }
    else{
        const bookings = await Booking.find({
            userId : savedUser._id
        });

        const bookingIds = bookings.map(bookingId => bookingId._id);

        queryObj.bookingId = { $in : bookingIds };
    }

    try{
        const payments = await Payment.find(queryObj);
        res.status(200).send(payments);
    } catch(err){
        console.log("Error while fetching the payments", err.message);
        res.status(500).send({
            message : "Some internal error while fetching the payments!"
        });
    }
}

exports.getPaymentById = async (req, res) => {
    const savedUser = await User.findOne({
        userId : req.userId
    });

    const savedPayment = await Payment.findOne({
        _id : req.params.id
    });

    if(!savedPayment){
        return res.status(400).send({
            message : "Invalid Payment Id"
        });
    }

    try{
        if(savedUser.userType == constants.userTypes.admin){

        }
        else{
            const savedBooking = await Booking.findOne({
                _id : savedPayment.bookingId
            });
    
            const userId = savedBooking.userId;
    
            if(!userId.equals(savedUser._id)){
                return res.status(403).send({
                    message : "Forbidden! Payment Id isn't associated with the logged in user"});
            }
        }
    
        res.status(200).send(savedPayment);
    } catch(err){
        console.log("Error while fetching a payment!", err.message);
        res.status(500).send({
            message : "Some internal error occurred while fetching the payment!"
        });
    }
}