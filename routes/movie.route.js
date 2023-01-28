const movieController = require('../controllers/movie.controller')
const movieRequestValidator = require('../middlewares/validateMovieRequest')

module.exports = function(app){
    app.post('/movieBooking/api/v1/movies', [movieRequestValidator.validateMovieNameRequest, movieRequestValidator.validateMovieStatusRequest], movieController.createMovie)
    app.get('/movieBooking/api/v1/movies', movieController.getAllMovies)
    app.get('/movieBooking/api/v1/movies/:id', movieController.getMovieById)
    app.put('/movieBooking/api/v1/movies/:id', [movieRequestValidator.validateMovieStatusRequest], movieController.updateMovie)
    app.delete('/movieBooking/api/v1/movies/:id', movieController.deleteMovie)
    app.get('/movieBooking/api/v1/movies/:movieId/theatres', movieController.getTheatresForAMovie)
}