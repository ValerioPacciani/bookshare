const express = require("express");
const controller = require("../controller/LoanController");
const protectionMiddleware = require("../middleware/AuthenticationMiddleware");

const LoanRouter = express.Router();


LoanRouter.get("/", protectionMiddleware, controller.getLoans);

LoanRouter.get("/recevied", protectionMiddleware, controller.getLoansReceived);


LoanRouter.post("/:id", protectionMiddleware, controller.createLoan); //bookID (l' user lo prendo da quello)

LoanRouter.put("/update/:id", protectionMiddleware, controller.updateLoanStatus);

LoanRouter.delete("/delete/:id", protectionMiddleware, controller.deleteLoan);

module.exports = LoanRouter;