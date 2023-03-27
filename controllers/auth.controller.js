const User = require("../models/user.model");
const {userTypes} = require("../utils/constants");
const constants = require("../utils/constants");
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
const config = require('../configs/auth.config');

// signup
exports.signup = async(req, res)=>{
    var userStatus = req.body.userStatus
    if (!req.body.userStatus){
        if (!req.body.userType || req.body.userType == constants.userTypes.customer){
            userStatus = constants.userStatus.approved
        }
        else{
            userStatus = constants.userStatus.pending
        }
    }
    const userObj = {
        name: req.body.name,
        userId: req.body.userId,
        email: req.body.email,
        userType: req.body.userType,
        password: bcrypt.hashSync(req.body.password, 8),
        userStatus: userStatus
    }

    try{
        const userCreated = await User.create(userObj);
        const postResponse = {
            name: userCreated.name,
            userId: userCreated.userId,
            email: userCreated.email,
            userTypes: userCreated.userType,
            userStatus: userCreated.userStatus,
            createdAt: userCreated.createdAt,
            updatedAt: userCreated.updatedAt
        }
        res.status(201).send(postResponse);
    }
    catch(err){
        console.log("Some error while saving the user in db", err.message);
        res.status(500).send({
            message: "Some internal error while inserting the element, Error-"+ err.message
        })
    }
}

exports.signin = async(req, res)=>{
    const user = await User.findOne({userId: req.body.userId});
    if (user == null){
        return res.status(400).send({
            message: "User does'nt exist"
        })
    }
    if(user.userStatus!="APPROVED"){
        return res.status(200).send({
            message:`can't allow to login as the user status is: [${user.userStatus}]`
        })
    }
    var passwordIsValid = bcrypt.compareSync(req.body.password, user.password)
    if (!passwordIsValid){
        return res.status(400).send({
            message: "Password does'nt match"
        })
    }
    var token = jwt.sign({id:user.userId}, config.secret, {expiresIn:1200})
    res.status(200).send({
        name: user.name,
        userId: user.userId,
        accessToken: token,
        userType: user.userType
    })
}