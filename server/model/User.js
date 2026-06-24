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
