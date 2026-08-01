//this is the scheme for mongodb

const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    display_name: {
      type: String,
      trim: true,
    },
    surname: {
      type: String,
      trim: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    user_description: {
      type: String,
      required: false,
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      required: false,
    },

    //campi per le immagini 
    genres_images:{
      type:Map,
      of:String,
      default:{
      "Mystery, Crime and Noir": "",
      "Thriller, Suspense": "",
      "Fantasy": "",
      "Science Fiction": "",
      "Horror": "horror",
      "Historical Fiction": "",
      "Romance": "",
      "Action and Adventure": "",
      "Contemporary Fiction": "",
      "Humor and Satire": "",
      "Computer Science and Tech": "",
      "Science and Mathematics": "",
      "History": "",
      "Philosophy and Psychology": "",
      "Politics and Sociology": "",
      "Economics and Business": "",
      "Self-Help and Personal Growth": "",
      "Religion and Spirituality": "",
      "Art, Music and Film": "",
      "Cooking and Gastronomy": "",
      "Travel and Guides": "",
      "Sports and Wellness": "",
      "Hobbies and Gardening": "",
      "True Crime": ""
      }
    },
    //campi per le loan, per mantenere in memoria uno storico
    loans_sended:{
      type: Number,
      default : 0,
      min:[0],
      required: false

    },
    loans_recieved:{
      type: Number,
      default : 0,
      min:[0],
      required: false

    },
    loans_sended_completed:{
      type: Number,
      default : 0,
      min:[0],
      required: false

    },
    loans_recieved_completed:{
      type: Number,
      default : 0,
      min:[0],
      required: false

    },
    //formato GeoJson per la posizione, è standardizzato e permette di fare algoritmi di geolocalizzazione.
    location: {
      type: {
        type: "String",
        default: "Point",
        enum: ["Point"],
      },
      coordinates: {
        type: [Number], //longitude e latitude (x e y)
        default: [0, 0],
      },
    },
  },
  { timestamps: true }, //crea automaticamente campi createdAt e updatedAt, lo fa mongodb come secondo argomento
);

userSchema.index({ location: "2dsphere" }); //crea l'indece gerosphere per la posizione.

module.exports = mongoose.model("User", userSchema);
