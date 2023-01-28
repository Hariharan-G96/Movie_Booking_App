validateTheatreRequestBody = (req, res, next) => {
    // Validate name
    if(!req.body.name){
        return res.status(400).send({
            message : "Failed! Theatre name is mandatory"
        });
    }

    // Validate description
    if(!req.body.description){
        return res.status(400).send({
            message : "Failed! Theatre description is mandatory"
        });
    }

    // Validate city
    if(!req.body.city){
        return res.status(400).send({
            message : "Failed! City is mandatory"
        });
    }

    // Validate pinCode
    if(!req.body.pinCode){
        return res.status(400).send({
            message : "Failed! Pin Code is mandatory"
        });
    }

    next();
}

module.exports = {
    validateTheatreRequestBody
}