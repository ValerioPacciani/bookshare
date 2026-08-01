const multer = require("multer"); //Multer è praticamente un traduttore che prende il messagio con l urle dell immagine dal frontend e la inoltra direttamente a cludianry, senza gestisoc con express

//siccome express non puo gestire i file binari creo un nuovo storage su cloudinary, e invio in automatico l immagine presa dal frontend nello storage
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const { cloudinary } = require("../config/cloudinary");

//Creazione del nuovo storage di cloudinarry
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "bookshare",
    allowed_formats: ["jpg", "jpeg", "png","webp"],
  },
});

const upload = multer({ storage }); //Creo l istanza multer con lo storage che ho configurato sopra, quindi posso esportare solo uploaf
module.exports = upload;

//Multer espone da solo l uplad e il remove, non devo crearli io
