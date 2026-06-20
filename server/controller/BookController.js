const Book = require("../model/Book");
const User = require("../model/User");

const getAllBooks = async (req, res) => {
  try {
    const bookArr = await Book.find({ owner: req.user._id });
    res.status(200).json(bookArr);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

const getBookById = async (req, res) => {
  try {
    const book = await Book.findOne({
      _id: req.params.id,
      owner: req.user._id,
    }); //!ricorda in mongodb, tutti gli id generati autoamticamente sono _id. Inoltre sto usando l'url, quindi per prenderlo uso params.id
    if (!book) {
      return res.status(404).json({ message: "libro non presente" });
    } else {
      res.status(200).json(book);
    }
  } catch (error) {
    console.error("Errore getBookById:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

const createBook = async (req, res) => {
  try {
    const { title, author, isbn, categories, isOnShare } = req.body;
    //Gestisco l immagine con multer e il campo file
    let coverImage = "";
    if (req.file) {
      coverImage = req.file.path; //ovvero l url dell immagine contenuta in req.file di multer, non i metadati
    } else {
      coverImage =
        "https://res.cloudinary.com/dcmko59gs/image/upload/v1781697204/book-cover-placeholder_a4t8on.png";
    }

    const owner = req.user._id; //sto usando il token per prendere l id dell autore
    if (!title || !author) {
      return res
        .status(400)
        .json({ message: "Titolo e autore sono obbligatori" });
    }
    const duplicate = await Book.findOne({
      title: title,
      author: author,
      owner: owner,
    }); //controllo se l utente ha già inserito un libro con lo stesso titolo e autore, per evitare duplicati;
    if (duplicate) {
      return res.status(400).json({ message: "Hai già inserito questo libro" });
    }
    const book = await Book.create({
      title, //equivalent to title: title , if the key = value we can shorthands to the key name
      author,
      isbn,
      coverImage,
      categories,
      owner,
      isOnShare,
    });
    res.status(201).json({ message: "Libro creato con successo", book });
  } catch (error) {
    console.log("errore di creazione", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

const deleteBook = async (req, res) => {
  try {
    const book = await Book.findOneAndDelete({
      _id: req.params.id,
      owner: req.user._id,
    });
    if (!book) {
      return res.status(404).json({ message: "Libro non trovato" });
    } else {
      res.status(200).json({ message: "Libro eliminato con successo" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

const updateBook = async (req, res) => {
  try {
    const { title, author, isbn, categories, isOnShare } = req.body;

    let coverImage = "";
    if (req.file) {
      coverImage = req.file.path;
    } else {
      const existingBook = await Book.findById(req.params.id); //if there is not a covber image, we should retrive the previus one already on the db-> Rember this is an update function
      coverImage = existingBook.coverImage;
    }

    const book = await Book.findOneAndUpdate(
      { _id: req.params.id, owner: req.user._id },
      { title, author, isbn, coverImage, categories, isOnShare },
      { new: true }, //ritorna il libro aggiornato
    );
    if (!book) {
      return res.status(404).json({ message: "Libro non trovato" });
    } else {
      res.status(200).json({ message: "Libro aggiornato con successo", book });
    }
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

//Endpoints for the geolcalization systems

const getNearBooks = async (req, res) => {
  try {
    const userId = req.user._id; //id presente nel context
    if (!userId) {
      return res.status(404).json({ message: "utente inesistente" }); //this sould never happen becouse we are logged in the context
    }
    const user = await User.findById(userId);
    const userLocation = user.location;

    const lat = userLocation.coordinates[1];
    const long = userLocation.coordinates[0];
    //console.log("latitudine:", lat);
    //console.log("longitudine:", long);
    const radius = req.query.radius;
    //console.log("radius =", parseInt(radius));

    const nearUsersResearch = await User.find({
      //this is the quesry we use to find a list of user that has these entryu in the db
      location: {
        $nearSphere: {
          $geometry: {
            type: "Point",
            coordinates: [parseFloat(long), parseFloat(lat)], //rember is lon firs and lat after
          },
          $maxDistance: parseFloat(radius),
        },
      },
    });
    return res.status(200).json(nearUsersResearch);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "server error", error: error.message });
  }
};

module.exports = {
  getAllBooks,
  getBookById,
  createBook,
  deleteBook,
  updateBook,
  getNearBooks,
};
