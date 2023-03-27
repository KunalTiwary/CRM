const User = require("../models/user.model");
const objectConverter = require("../utils/objectConverter");
const constants = require("../utils/constants");

exports.findAll = async(req, res) => {
    let userTypeReq = req.query.userType;
    let userStatusReq = req.query.userStatus;
    let userNameReq = req.query.name;

    var users;
    if(userNameReq){
        try{
            users = await User.find({
                userName: userNameReq
            });
        }
        catch(err){
            console.err("error while fetching the user for username: ", userNameReq);
            res.status(500).send({
                message:"Some internal error occured"
            })
        }
    }
    else if(userTypeReq && userStatusReq){
        try{
            users = await User.find({
                userType: userTypeReq,
                userStatus: userStatusReq
            })
        }
        catch(err){
            console.err(`error while fetching the user, userType [${userTypeReq}] and [${userStatusReq}]`)
        res.status(500).send({
            message:"Some internal error occured"
        })
        }
    }
    else if(userTypeReq){
        try{
            users = await User.find({
                userType: userTypeReq
            })
        }
        catch(err){
            console.err(`error while fetching the user, userType [${userTypeReq}]`)
        res.status(500).send({
            message:"Some internal error occured"
        })
        }
    }
    else if(userStatusReq){
        try{
            users = await User.find({
                userStatus: userStatusReq
            })
        }
        catch(err){
            console.err(`error while fetching the user, userStatus [${userStatusReq}]`)
        res.status(500).send({
            message:"Some internal error occured"
        })
        }
    }
    else{
        try{
            users = await User.find();
        }
        catch(err){
            console.err(`error while fetching the users`)
        res.status(500).send({
            message:"Some internal error occured"
        })
    }}
return res.status(200).send(objectConverter.userResponse(users));
}

exports.findById = async(req, res) => {
    const userReq = req.params.userId
    const user = await User.find({
        userId: userReq
    })
    if (user){
        return res.status(200).send(objectConverter.userResponse(user));
    }else{
        return res.status(200).send({
            message: `User with this Id [${userReq}] does not exist.`
        })
    }

}

exports.update = async(req, res) => {
    const userReq = req.params.userId
    try{
        const user = await User.findOneAndUpdate({
            usedId: userReq
        }, {
            userName: req.body.userName,
            userStatus: req.body.userStatus,
            userType: req.body.userType
        }).exec()

        return res.status(200).send({
            message: "Updated"
        })
    }
    catch(err){
        console.log("Error while updating user", err.message)
        return res.status(500).send({
            message:"Internal Server Error"
        })
    };
}