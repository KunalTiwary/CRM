const ticketController = require("../controllers/ticket.controller")
const {authJwt} = require("../middlewares");
const {verifyTicketRequestBody} = require("../middlewares");
const router = require('express').Router();

router.post("/crm/api/v1/tickets/", authJwt.verifyToken, verifyTicketRequestBody.validateTicketRequestBody, ticketController.createTicket)

router.put("/crm/api/v1/tickets/:id", authJwt.verifyToken, verifyTicketRequestBody.validateTicketStatus, ticketController.updateTicket)

router.get("/crm/api/v1/tickets", [authJwt.verifyToken], ticketController.getAllTickets);

module.exports = router;