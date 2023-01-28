const Theatre = require('../models/theatre.model');
const Movie = require('../models/movie.model');

exports.createTheatre = async (req, res) => {
    const theatreObject = {
        name : req.body.name,
        description : req.body.description,
        city : req.body.city,
        pinCode : req.body.pinCode
    }

    try{
        const theatre = await Theatre.create(theatreObject);

        res.status(201).send(theatre);
    } catch(err){
        console.log('Error in creating a theatre', err.message);
        res.status(500).send({
            message : "Internal Server Error"
        })
    }
}

exports.getAllTheatres = async (req, res) => {
    const queryObj = {}

    if(req.query.city != undefined){
        queryObj.city = req.query.city;
    }

    if(req.query.name != undefined){
        queryObj.name = req.query.name;
    }

    if(req.query.pinCode != undefined){
        queryObj.pinCode = req.query.pinCode;
    }

    try{
        const theatres = await Theatre.find(queryObj);

        res.status(200).send(theatres);
    } catch(err){
        console.log("Error in finding theatres", err.message);
        res.status(500).send({
            message : "Internal Server Error"
        })
    }
}

exports.getTheatreById = async (req, res) => {
    const id = req.params.id;

    try{
        const theatre = await Theatre.findOne({
            _id : id
        })

        if(!theatre){
            res.status(400).send({
                message : `Theatre with the id : ${id} does not exist`
            })
            return;
        }

        res.status(200).send(theatre);
    } catch(err){
        console.log('Error in finding a theatre', err.message)
        res.status(500).send({
            message : "Internal Server Error"
        })
    }
}

exports.updateTheatre = async (req, res) => {
    const id = req.params.id;

    const savedTheatre = await Theatre.findOne({
        _id : id
    })

    if(!savedTheatre){
        res.status(400).send({
            message : `Couldn't update! Theatre with the id ${id} does not exist`
        })
        return;
    }

    // Updating the theatre details

    savedTheatre.name = req.body.name ? req.body.name : savedTheatre.name;
    savedTheatre.description = req.body.description ? req.body.description : savedTheatre.description;
    savedTheatre.city = req.body.city ? req.body.city : savedTheatre.city;
    savedTheatre.pinCode = req.body.pinCode ? req.body.pinCode : savedTheatre.pinCode;

    try{
        const updatedTheatre = await savedTheatre.save();

        res.status(200).send({
            message : "Theatre got updated successfully!",
            updatedTheatre : updatedTheatre
        });

    } catch(err){
        console.log('Error in updating a theatre', err.message)
        res.status(500).send({
            message : "Internal Server Error"
        })
    }
}

exports.deleteTheatre = async (req, res) => {
    try{
        await Theatre.deleteOne({
            _id : req.params.id
        })

        res.status(200).send({
            message : `Theatre with the id : ${req.params.id} got deleted successfully!`
        })
    } catch(err){
        console.log('Error in deleting a theatre', err.message)
        res.status(500).send({
            message : "Internal Server Error"
        })
    }
}

exports.addMoviesToTheatre = async (req, res) => {
    const theatreId = req.params.theatreId;

    const savedTheatre = await Theatre.findOne({
        _id : theatreId
    })

    if(!savedTheatre){
        return res.status(400).send({
            message : `Theatre with the id : ${theatreId} does not exist`
        })
    }

    const movieIds = req.body.movies;

    if(req.body.insert){
        movieIds.forEach(movieId => savedTheatre.movies.push(movieId));
    }
    else if(req.body.delete){
        let savedMovieIds = savedTheatre.movies.filter(movieId => {
            return !movieIds.includes(movieId.toString());
        })
        savedTheatre.movies = savedMovieIds;
    }

    try{
        const updatedTheatre = await savedTheatre.save();

        return res.status(200).send({
            message : "Movies updated in the theatre successfully!",
            updatedTheatre : updatedTheatre
        })
    } catch(err){
        console.log('Error in updating movies in the theatre', err.message);
        res.status(500).send({
            message : "Internal Server Error"
        })
    }
}

exports.checkIfMovieRunningInATheatre = async (req, res) => {
    try{
        const {movieId, theatreId} = req.params;

        const savedTheatre = await Theatre.findOne({
            _id : theatreId
        })

        const savedMovie = await Movie.findOne({
            _id : movieId
        })

        if(!savedTheatre){
            res.status(400).send({
                message : "Invalid Theatre ID"
            })
            return;
        }

        if(!savedMovie){
            res.status(400).send({
                message : "Invalid Movie ID"
            })
            return;
        }

        const response = {
            message : savedTheatre.movies.includes(movieId) ? "Movie is running in the theatre" : "Movie isn't running in the theatre"
        };

        res.status(200).send(response);
    } catch(err){
        console.log("Error in finding if a movie running in a theatre", err.message);
        res.status(500).send({
            message : "Internal Server Error"
        });
    }
}