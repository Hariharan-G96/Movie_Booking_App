const theatreController = require('../controllers/theatre.controller')
const {verifyToken, isAdmin} = require('../middlewares/authJwt');
const {validateTheatreRequestBody} = require('../middlewares/validateTheatreReqBody')

module.exports = function(app){
    app.post('/movieBooking/api/v1/theatres', [verifyToken, isAdmin, validateTheatreRequestBody], theatreController.createTheatre)
    app.get('/movieBooking/api/v1/theatres', [verifyToken], theatreController.getAllTheatres)
    app.get('/movieBooking/api/v1/theatres/:id', [verifyToken], theatreController.getTheatreById)
    app.put('/movieBooking/api/v1/theatres/:id', [verifyToken, isAdmin], theatreController.updateTheatre)
    app.delete('/movieBooking/api/v1/theatres/:id', [verifyToken, isAdmin], theatreController.deleteTheatre)
    app.put('/movieBooking/api/v1/theatres/:theatreId/movies', [verifyToken, isAdmin], theatreController.addMoviesToTheatre)
    app.get('/movieBooking/api/v1/theatres/:theatreId/movies/:movieId', [verifyToken], theatreController.checkIfMovieRunningInATheatre)
}