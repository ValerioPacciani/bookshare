const express = require("express");
const controller = require("../controller/LoanController");
const protectionMiddleware = require("../middleware/AuthenticationMiddleware");

const LoanRouter = express.Router();


LoanRouter.get("/", protectionMiddleware, controller.getLoans);
LoanRouter.post("/:id", protectionMiddleware, controller.createLoan); //bookID (l' user lo prendo da quello)
LoanRouter.get("/recevied", protectionMiddleware, controller.getLoansReceived);

module.exports = LoanRouter;