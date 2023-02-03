const bookingController = require('../controllers/booking.controller')
const {verifyToken, isAdmin} = require('../middlewares/authJwt')
const {validateBookingRequestBody} = require('../middlewares/validateBookingReqBody')

module.exports = function(app){
    app.post('/movieBooking/api/v1/bookings', [verifyToken, validateBookingRequestBody], bookingController.createBooking)
    app.get('/movieBooking/api/v1/bookings/:id', [verifyToken], bookingController.getBookingById)
    app.get('/movieBooking/api/v1/bookings', [verifyToken], bookingController.getAllBookings)
    app.put('/movieBooking/api/v1/bookings/:id', [verifyToken, isAdmin], bookingController.updateBooking)
    app.put('/movieBooking/api/v1/bookings/:id/cancel', [verifyToken], bookingController.cancelBooking)
}