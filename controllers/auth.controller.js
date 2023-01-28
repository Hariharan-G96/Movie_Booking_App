const express = require('express');
const User = require('../models/user.model');
const constants = require('../utils/constants');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authConfig = require('../configs/auth.config')

exports.signUp = async (req, res) => {

    let userStatus;

    if(!req.body.userType || req.body.userType == constants.userTypes.customer){
        userStatus = constants.userStatus.approved;
    }
    else{
        userStatus = constants.userStatus.pending;
    }

    const userObj = {
        name : req.body.name,
        userId : req.body.userId,
        email : req.body.email,
        password : bcrypt.hashSync(req.body.password, 8),
        userType : req.body.userType,
        userStatus : userStatus
    };

    try{
        const user = await User.create(userObj);
        res.status(201).send(user);
    } catch(err){
        console.log("Error in creating a user", err.message);
        res.status(500).send({
            message : "Internal Server Error"
        })
    }
}

exports.signIn = async (req, res) => {

    try{
        const {userId, password} = req.body;

        // Verify whether the userId is valid or not

        const user = await User.findOne({userId});

        if(!user){
            return res.status(400).send({
                message : "User ID doesn't exist"
            });
        }

        if(user.userStatus != constants.userStatus.approved){
            return res.status(403).send({
                message : "Only approved users are allowed to sign in"
            });
        }

        let isValidPassword = bcrypt.compareSync(req.body.password, user.password);

        if(!isValidPassword){
            return res.status(401).send({
                message : "Invalid Credentials!"
            });
        }

        const token = jwt.sign({id : user.userId}, authConfig.secret_key, {expiresIn : 7200});

        res.status(200).send({
            name : user.name,
            userId : user.userId,
            email : user.email,
            userType : user.userType,
            userStatus : user.userStatus,
            accessToken : token
        });

    } catch(err){
        console.log("Error while signing in", err.message);
        res.status(500).send({
            message : "Internal Server Error"
        });
    } 
}