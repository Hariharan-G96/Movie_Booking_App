const authController = require('../controllers/auth.controller');

module.exports = function(app){
    app.post('/movieBooking/api/v1/auth/signUp', authController.signUp)
    app.post('/movieBooking/api/v1/auth/signIn', authController.signIn)
}