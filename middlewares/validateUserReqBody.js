const User = require('../models/user.model')
const constants = require('../utils/constants')

validateUserRequestBody = async (req, res, next) => {
    // Validate name
    if(!req.body.name){
        return res.status(400).send({
            message : "Failed! Name is mandatory"
        });
    }

    // Validate userId
    if(!req.body.userId){
        return res.status(400).send({
            message : "Failed! userId is mandatory"
        });
    }

    const user = await User.findOne({
        userId : req.body.userId
    });

    if(user != null){
        return res.status(400).send({
            message : "Failed! userId already exists"
        });
    }

    // Validate email
    if(!req.body.email){
        return res.status(400).send({
            message : "Failed! email is mandatory"
        });
    }

    const email = await User.findOne({
        email : req.body.email
    });

    if(email != null){
        return res.status(400).send({
            message : "Failed! email already exists"
        });
    }

    // Validate userType
    const userTypes = [constants.userTypes.admin, constants.userTypes.client, constants.userTypes.customer];

    if(req.body.userType && !userTypes.includes(req.body.userType)){
        return res.status(400).send({
            message : `Failed! userType should be among : ${userTypes}`
        });
    }

    next();
}

module.exports = {
    validateUserRequestBody
}