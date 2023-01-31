const Movie = require('../models/movie.model')
const Theatre = require('../models/theatre.model')

validateBookingRequestBody = async(req, res, next) => {
    if(!req.body.theatreId){
        return res.status(400).send({
            message : "Failed! Theatre Id is mandatory"
        });
    }

    const savedTheatre = await Theatre.findOne({
        _id : req.body.theatreId
    })

    if(!savedTheatre){
        return res.status(400).send({
            message : "Failed! Theatre Id is invalid!"
        });
    }

    if(!req.body.movieId){
        return res.status(400).send({
            message : "Failed! Movie Id is mandatory"
        });
    }

    const savedMovie = await Movie.findOne({
        _id : req.body.movieId
    })

    if(!savedMovie){
        return res.status(400).send({
            message : "Failed! Movie Id is invalid!"
        });
    }

    if(!savedTheatre.movies.includes(req.body.movieId)){
        return res.status(400).send({
            message : "Failed! Movie is not running in this theatre!"
        }); 
    }
    
    if(!req.body.timing){
        return res.status(400).send({
            message : "Failed! Timing is mandatory"
        });
    }

    if(!req.body.noOfSeats){
        return res.status(400).send({
            message : "Failed! At least one seat should be selected"
        });
    }

    next();
}

module.exports = {
    validateBookingRequestBody
};