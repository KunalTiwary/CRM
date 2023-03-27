const User = require('../models/user.model');
const { userTypes } = require('../utils/constants');
const constants = require('../utils/constants');

// User type is sent through request
exports.validateBody = async(req, res, next)=>{
    const userType = req.body.userType;
    const userTypes = [constants.userTypes.customer, constants.userTypes.engineer, constants.userTypes.admin]
    if (userType && !userTypes.includes(userType)){
        return res.status(400).send({
            message:"User Type is not Valid"
        });
    };
    next();
};

exports.validateReqAndStatus = async(req, res, next)=> {
    const userReq = req.params.userId
    const userStatuses = [constants.userStatus.approved, constants.userStatus.pending, constants.userStatus.rejected]
    const userTypes = [constants.userTypes.admin, constants.userTypes.customer, constants.userTypes.engineer]

    if (req.body.userType && !userTypes.includes(req.body.userType)){
        return res.status(400).send({
            message: "Invalid UserType Provided"
        });
    }

    else if (req.body.userStatus && !userStatuses.includes(req.body.userStatus)){
        return res.status(400).send({
            message: "Invalid UserStatus Provided"
        });
    }
    else{
        next();
    }
}