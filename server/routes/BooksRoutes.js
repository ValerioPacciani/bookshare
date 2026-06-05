//routes per la gestione dei libri

const express = require('express');
const controller = require('../controller/BookController');
const protectionMiddleware = require('../middleware/AuthenticationMiddleware')

const BookRouter = express.Router();

BookRouter.get('/', protectionMiddleware, controller.getAllBooks);
BookRouter.get('/:id', protectionMiddleware, controller.getBookById);
BookRouter.post('/', protectionMiddleware, controller.createBook);
BookRouter.put('/:id', protectionMiddleware, controller.updateBook);
BookRouter.delete('/:id', protectionMiddleware, controller.deleteBook);



module.exports = BookRouter;