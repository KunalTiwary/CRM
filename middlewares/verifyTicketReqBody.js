const constants = require("../utils/constants")

validateTicketRequestBody = async(req, res, next) => {

    if(!req.body.title) {
        res.status(400).send({
            message: "Failed! Title not provided"
        })
        return;
    }

    if(!req.body.description) {
        res.status(400).send({
            message: "Failed! Description not provided"
        })
        return;
    }

    next();
};

validateTicketStatus = async(req, res, next) => {

    const status = req.body.status;
    const statusTypes = [constants.ticketStatus.open, constants.ticketStatus.closed, constants.ticketStatus.inProgress, 
        constants.ticketStatus.blocked]
    if(status && !statusTypes.includes(status)) {
        res.status(400).send({
            message: "status provided is invalid. Possible values CLOSED | BLOCKED | IN_PROGRESS | OPEN"
        })
    }

    next();
}

const verifyTicketRequestBody = {
    validateTicketRequestBody: validateTicketRequestBody,
    validateTicketStatus: validateTicketStatus
}

module.exports = verifyTicketRequestBody