const jwt = require('jsonwebtoken');
const config = require('../configs/auth.config');
const User = require('../models/user.model');
const constants = require('../utils/constants');

verifyToken = (req, res, next)=>{
    let token = req.headers["x-access-token"];
    if(!token){
        return res.status(403).send({
            message: "No token provided"
        });
    }
    jwt.verify(token, config.secret, (err, decoded) => {
        if(err){
            return res.status(401).send({
                message:"Unauthorized"
            });
        }
        req.userId = decoded.id;
        next();
    })
}
// job is same as verifyReqBody but the user Id is not sent through request.
isAdmin = async(req, res, next) => {
    const user = await User.findOne({
        userId: req.userId
    })
    
    if(user && user.userType == constants.userTypes.admin){
        next();
    }
    else{
        return res.status(403).send({
            message: "Require Admin Role"
        })
    }
}

const authJwt = {
    verifyToken: verifyToken,
    isAdmin: isAdmin 
}

module.exports = authJwt