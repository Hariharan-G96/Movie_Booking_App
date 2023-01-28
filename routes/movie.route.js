const movieController = require('../controllers/movie.controller')
const movieRequestValidator = require('../middlewares/validateMovieRequest')
const {verifyToken, isAdmin} = require('../middlewares/authJwt')

module.exports = function(app){
    app.post('/movieBooking/api/v1/movies', [verifyToken, isAdmin, movieRequestValidator.validateMovieNameRequest, movieRequestValidator.validateMovieStatusRequest], movieController.createMovie)
    app.get('/movieBooking/api/v1/movies', [verifyToken], movieController.getAllMovies)
    app.get('/movieBooking/api/v1/movies/:id', [verifyToken], movieController.getMovieById)
    app.put('/movieBooking/api/v1/movies/:id', [verifyToken, isAdmin, movieRequestValidator.validateMovieStatusRequest], movieController.updateMovie)
    app.delete('/movieBooking/api/v1/movies/:id', [verifyToken, isAdmin], movieController.deleteMovie)
    app.get('/movieBooking/api/v1/movies/:movieId/theatres', [verifyToken], movieController.getTheatresForAMovie)
}