const Movie = require('../models/movie.model')
const Theatre = require('../models/theatre.model')

exports.createMovie = async (req, res) => {
    try{
        const movie = await Movie.create(req.body);
        res.status(201).send(movie)
    } catch(err){
        console.log('Error while creating a movie', err.message);
        res.status(500).send({
            message : 'Internal Server Error'
        })
    }
}

exports.getAllMovies = async (req, res) => {
    const query = {}

    if(req.query.name != undefined){
        query.name = req.query.name
    }

    try{
        const movies = await Movie.find(query)
        res.status(200).send(movies);
    } catch(err){
        console.log('Error in finding movies', err.message)
        res.status(500).send({
            message : 'Internal Server Error'
        })
    }
}

exports.getMovieById = async (req, res) => {
    try{
        const movie = await Movie.findOne({
            _id : req.params.id
        })

        if(!movie){
            res.status(400).send({
                message : `Movie with the id : ${req.params.id} does not exist`
            })
            return;
        }

        res.status(200).send(movie);
    } catch(err){
        console.log('Error in finding a movie', err.message)
        res.status(500).send({
            message : 'Internal Server Error'
        })
    }
}

exports.updateMovie = async (req, res) => {
    const id = req.params.id;

    const savedMovie = await Movie.findOne({
        _id : id
    })

    if(!savedMovie){
        res.status(400).send({
            message : `Couldn't update! Movie with the id : ${id} doesn't exist`
        })
        return;
    }

    savedMovie.name = req.body.name ? req.body.name : savedMovie.name;
    savedMovie.description = req.body.description ? req.body.description : savedMovie.description;
    savedMovie.casts = req.body.casts ? req.body.casts : savedMovie.casts;
    savedMovie.director = req.body.director ? req.body.director : savedMovie.director;
    savedMovie.trailerUrl = req.body.trailerUrl ? req.body.trailerUrl : savedMovie.trailerUrl;
    savedMovie.posterUrl = req.body.posterUrl ? req.body.posterUrl : savedMovie.posterUrl;
    savedMovie.language = req.body.language ? req.body.language : savedMovie.language;
    savedMovie.releaseDate = req.body.releaseDate ? req.body.releaseDate : savedMovie.releaseDate;
    savedMovie.releaseStatus = req.body.releaseStatus ? req.body.releaseStatus : savedMovie.releaseStatus;

    try{
        const updatedMovie = await savedMovie.save()

        res.status(200).send({
            message : 'Movie got updated successfully!',
            updatedMovie : updatedMovie
        })
    } catch(err){
        console.log('Error in updating a movie', err.message)
        res.status(500).send({
            message : 'Internal Server Error'
        })
    }
}

exports.deleteMovie = async (req, res) => {
    try{
        const movie = await Movie.deleteOne({
            _id : req.params.id
        })

        res.status(200).send({
            message : `Movie with the id : ${req.params.id} has been deleted successfully!`
        })
    } catch(err){
        console.log('Error in deleting a movie', err.message)
        res.status(500).send({
            message : 'Internal Server Error'
        })
    }
}

exports.getTheatresForAMovie = async (req, res) => {
    try{
        // Get the Movie Id
        const movieId = req.params.movieId;

        // Validate Movie Id
        const savedMovie = await Movie.findById({
            _id : movieId
        })

        if(!savedMovie){
            return res.status(400).send({
                message : "Invalid Movie ID"
            });
        }

        // Get all the theatres
        const savedTheatres = await Theatre.find({});

        const validTheatresWithMovies = savedTheatres.filter(theatre => theatre.movies.includes(movieId));

        res.status(200).send(validTheatresWithMovies);

    } catch(err){
        console.log("Error in finding a movie running in the theatres", err.message);
        res.status(500).send({
            message : "Internal Server Error"
        });
    }
}