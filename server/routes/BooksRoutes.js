//routes per la gestione dei libri

const express = require("express");
const controller = require("../controller/BookController");
const protectionMiddleware = require("../middleware/AuthenticationMiddleware");
const uploadMiddleware = require("../middleware/ImagesUploaderMiddleware");

const BookRouter = express.Router();

BookRouter.get("/", protectionMiddleware, controller.getAllBooks);
BookRouter.get("/:id", protectionMiddleware, controller.getBookById);
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
BookRouter.delete("/:id", protectionMiddleware, controller.deleteBook);
BookRouter.get("/near/:id", protectionMiddleware, controller.getNearBooks); //check the book near the users the id there is the user id

module.exports = BookRouter;
