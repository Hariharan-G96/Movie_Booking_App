const Booking = require('../models/booking.model')
const User = require('../models/user.model')
const constants = require('../utils/constants')

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
        totalCost : req.body.noOfSeats * constants.ticketCost
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

exports.updateBooking = async (req, res) => {
    const savedBooking = await Booking.findOne({
        _id : req.params.id
    });

    if(!savedBooking){
        return res.status(400).send({
            message : "Invalid Booking Id"
        });
    }

    savedBooking.theatreId = req.body.theatreId ? req.body.theatreId : savedBooking.theatreId;
    savedBooking.movieId = req.body.movieId ? req.body.movieId : savedBooking.movieId;
    savedBooking.userId = req.body.userId ? req.body.userId : savedBooking.userId;
    savedBooking.timing = req.body.timing ? req.body.timing : savedBooking.timing;
    savedBooking.noOfSeats = req.body.noOfSeats ? req.body.noOfSeats : savedBooking.noOfSeats;
    savedBooking.totalCost = savedBooking.noOfSeats * constants.ticketPrice;
    savedBooking.status = req.body.status ? req.body.status : savedBooking.status;

    try{
        const updatedBooking = await savedBooking.save();
        res.status(201).send({
            message : "Booking has been updated successfully",
            updatedBooking : updatedBooking
        });
    } catch(err){
        console.log("Error while updating the booking", err.message);
        res.status(500).send({
            message : "Some internal error while updating the booking"
        });
    }
}

exports.cancelBooking = async (req, res) => {
    const savedBooking = await Booking.findOne({
        _id : req.params.id
    });

    const savedUser = await User.findOne({
        userId : req.userId
    });

    if(!savedBooking){
        return res.status(400).send({
            message : "Invalid Booking Id"
        });
    }

    if(!savedBooking.userId.equals(savedUser._id)){
        return res.status(403).send({
            message : "User has insufficient privileges to cancel this booking"
        }); 
    }

    savedBooking.status = constants.bookingStatus.cancelled;

    try{
        const cancelledBooking = await savedBooking.save();
        res.status(201).send({
            message : "Booking has been cancelled!",
            cancelledBooking : cancelledBooking
        });
    } catch(err){
        console.log("Error while cancelling the booking", err.message);
        res.status(500).send({
            message : "Some internal error while cancelling the booking"
        }); 
    }
}