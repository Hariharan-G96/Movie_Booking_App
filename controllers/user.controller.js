const User = require('../models/user.model')
const bcrypt = require('bcryptjs')

exports.changePwd = async (req, res) => {
    const userId = req.userId;

    if(!req.body.password){
        return res.status(400).send({
            message : "Password to change should be passed"
        });
    }

    try{
        const user = await User.findOneAndUpdate({
            userId : userId
        }, {
            password : bcrypt.hashSync(req.body.password, 8)
        }).exec();

        res.status(200).send({
            message : "Password changed successfully"
        });

    } catch(err){
        console.log("Error in changing the password", err.message);
        res.status(500).send({
            message : "Internal Server Error"
        });
    }
}

exports.updateUser = async (req, res) => {

    const userId = req.params.userId;

    try{
        const user = await User.findOneAndUpdate({
            userId : userId
        }, {
            userStatus : req.body.userStatus
        }).exec();

        if(!user){
            return res.status(400).send({
                message : "Invalid User ID"
            });
        }

        res.status(200).send({
            message : "User has been updated successfully!"
        });
    } catch(err){
        console.log("Error while updating the user status", err.message);
        res.status(500).send({
            message : "Internal Server Error"
        });
    }
}