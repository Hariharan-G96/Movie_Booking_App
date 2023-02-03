const paymentController = require('../controllers/payment.controller')
const {verifyToken} = require('../middlewares/authJwt')
const {validatePaymentRequestBody} = require('../middlewares/validatePaymentReqBody')

module.exports = function(app){
        app.post('/movieBooking/api/v1/payments', [verifyToken, validatePaymentRequestBody], paymentController.createNewPayment)
}