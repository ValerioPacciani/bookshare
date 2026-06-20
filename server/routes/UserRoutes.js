const express = require("express");
const controller = require("../controller/UserController");
const protectionMiddleware = require("../middleware/AuthenticationMiddleware");

const userRouter = express.Router();

userRouter.get(
  "/userlocation",
  protectionMiddleware,
  controller.getUserLocation,
);

module.exports = userRouter;
