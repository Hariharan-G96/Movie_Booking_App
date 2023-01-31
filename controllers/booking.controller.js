const Booking = require('../models/booking.model')
const User = require('../models/user.model')

exports.createBooking = async (req, res) => {
    const user = await User.findOne({
        userId : req.userId
    });

    const bookingObj = {
        theatreId : req.body.theatreId,
        movieId : req.body.movieId,
        userId : user._id,
        timing : req.body.timing,
        noOfSeats : req.body.noOfSeats,
        totalCost : req.body.noOfSeats * 220.10
    };

    try{
        const booking = await Booking.create(bookingObj);
        res.status(201).send(booking);
    } catch(err){
        console.log("Error while booking a ticket", err.message);
        res.status(500).send({
            message : "Internal Server Error"
        });
    }
}

exports.getBookingById = async (req, res) => {
    try{
        const booking = await Booking.findOne({
            _id : req.params.id
        });

        if(!booking){
            return res.status(400).send({
                message : "Invalid booking!"
            });
        }

        res.status(200).send(booking);
    } catch(err){
        console.log("Error while finding a booking", err.message);
        res.status(500).send({
            message : "Internal Server Error"
        });
    }
}

exports.getAllBookings = async (req, res) => {
    try{
        const bookings = await Booking.find({});
        res.status(200).send(bookings);
    } catch(err){
        console.log("Error while finding bookings", err.message);
        res.status(500).send({
            message : "Internal Server Error"
        });
    }
}