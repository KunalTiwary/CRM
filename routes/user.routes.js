const userController = require("../controllers/user.controller");
const router = require('express').Router();
const {authJwt} = require('../middlewares');
const verifyBody = require("../middlewares/verifyReqBody");


router.get("/crm/api/v1/users", authJwt.verifyToken, authJwt.isAdmin, userController.findAll)

router.get("/crm/api/v1/users/:userId", authJwt.verifyToken, authJwt.isAdmin, userController.findById)

router.put("/crm/api/v1/users/:userId", authJwt.verifyToken, authJwt.isAdmin, verifyBody.validateReqAndStatus , userController.update)

module.exports = router;