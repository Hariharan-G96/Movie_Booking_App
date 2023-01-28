const authController = require('../controllers/auth.controller');
const {validateUserRequestBody} = require('../middlewares/validateUserReqBody')

module.exports = function(app){
    app.post('/movieBooking/api/v1/auth/signUp', [validateUserRequestBody], authController.signUp)
    app.post('/movieBooking/api/v1/auth/signIn', authController.signIn)
}