const mongoose = require("mongoose");
const {BOOK_GENRES , BOOK_TYPES} = require("../utils/Costant")
const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    author: {
      type: String,
      required: true,
    },
    isOnShare: {
      type: Boolean,
      default: false,
      required: true,
    },
    isbn: {
      type: String,
      required: false, //non serve che abbia un isbn
    },
    coverImage: {
      type: String, //non salvo un binario su mongodb, usero un sistema esterno, per non appesantire il db
      required: false,
      default: "",
    },
    read_percentage:{
      type: Number,
      required:false,
      default:0,
      min :[0, "il minimo consentito è 0"],
      max: [100, "il massimo consentito è 100"]
    },
    categories: {
      type: [String],
      enum:BOOK_GENRES,
      required: false,
    },
    book_type:{
      type: String,
      enum: BOOK_TYPES,
      required:false,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId, //collegamento con l'utente che possiede il libro, è un id di mongodb
      ref: "User", //collegamento con la collezione User, cosi posso fare populate per prendere i dati dell'utente
      required: true,
    },
  },
  { timestamps: true }, //crea automaticamente campi createdAt e updatedAt, lo fa mongodb come secondo argomento
);

module.exports = mongoose.model("Book", bookSchema);
