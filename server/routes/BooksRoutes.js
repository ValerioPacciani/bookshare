//routes per la gestione dei libri

const express = require("express");
const controller = require("../controller/BookController");
const protectionMiddleware = require("../middleware/AuthenticationMiddleware");
const uploadMiddleware = require("../middleware/ImagesUploaderMiddleware");
const Book = require("../model/Book");

const BookRouter = express.Router();

BookRouter.get("/", protectionMiddleware, controller.getAllBooks);

//coverImage è il nome del file che deve intercettare, è inportante che sia uguale!
BookRouter.post(
  "/",
  protectionMiddleware,
  uploadMiddleware.single("coverImage"),
  controller.createBook,
); //sui post avro anche l upload per gestire le immagini
BookRouter.put(
  "/:id",
  protectionMiddleware,
  uploadMiddleware.single("coverImage"),
  controller.updateBook,
);

BookRouter.get("/near", protectionMiddleware, controller.getNearBooks);
BookRouter.get(
  "/onShare/:id",
  protectionMiddleware,
  controller.getBooksOnShare,
);

//IMPORTANT THE :id ROUTES SHOULD BE AFTER THE OTHER OTHRWISE EXPRESS USE FIRST THE :id and it expects a value so it use the /near for exeple as an id value
BookRouter.get("/:id", protectionMiddleware, controller.getBookById);
BookRouter.delete("/:id", protectionMiddleware, controller.deleteBook);
BookRouter.put(
  "/:id",
  protectionMiddleware,
  uploadMiddleware.single("coverImage"),
  controller.updateBook,
);

module.exports = BookRouter;
