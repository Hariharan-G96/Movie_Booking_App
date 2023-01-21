const releaseStatusValues = require('../utils/constants').releaseStatus

const validateMovieNameRequest = (req, res, next) => {
    if(!req.body.name){
        return res.status(400).send({
            message : 'Failed! Movie Name is mandatory'
        })
    }

    next();
}

const validateMovieStatusRequest = (req, res, next) => {
    const releaseStatus = req.body.releaseStatus;

    const validStatus = [releaseStatusValues.released, releaseStatusValues.unreleased, releaseStatusValues.blocked]

    if(!validStatus.includes(releaseStatus)){
        return res.status(400).send({
            message : `Failed! Movie release status is out of ${validStatus}`
        })
    }

    next();
}

module.exports = {
    validateMovieNameRequest : validateMovieNameRequest,
    validateMovieStatusRequest : validateMovieStatusRequest
}