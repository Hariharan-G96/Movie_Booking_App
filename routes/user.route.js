const userController = require('../controllers/user.controller')
const {verifyToken, isAdmin} = require('../middlewares/authJwt')

module.exports = function(app){
    app.put('/movieBooking/api/v1/users', [verifyToken], userController.changePwd)
    app.put('/movieBooking/api/v1/users/:userId', [verifyToken, isAdmin], userController.updateUser)
}