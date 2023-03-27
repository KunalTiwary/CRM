const authController = require("../controllers/auth.controller");
const router = require('express').Router();
const verifyBody = require("../middlewares/verifyReqBody");


router.post("/crm/api/v1/auth/signup", verifyBody.validateBody, authController.signup);

router.post("/crm/api/v1/auth/signin", verifyBody.validateBody, authController.signin);

module.exports = router;