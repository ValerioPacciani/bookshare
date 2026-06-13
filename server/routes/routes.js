//express router,collegamento tra index e controller, per evitare tutta la logica sul controller

const express = require("express");

const controller = require("../controller/AuthenticationController");
const protectionMiddleware = require("../middleware/AuthenticationMiddleware");

const Approuter = express.Router(); //oggetto che mi permette di creare delle route generiche, poi possono essere specializzate in index.js

Approuter.post("/register", controller.registerUser);
Approuter.post("/login", controller.loginUser);

//TODO aggiungere le route per la modifica dell utente e l aggiunta dell avatar

module.exports = Approuter;
