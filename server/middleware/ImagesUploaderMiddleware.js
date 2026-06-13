const multer = require("multer"); //Multer è praticamente un traduttore che prende il messagio con l urle dell immagine dal frontend e la inoltra direttamente a cludianry, lo gestisoc con express
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const { cloudinary } = require("../config/cloudinary");

//Creazione del nuovo storage di cloudinarry
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "bookshare",
    allowed_formats: ["jpg", "jpeg", "png"],
  },
});

const upload = multer({ storage }); //Creo l istanza multer con lo storage che ho configurato sopra, quindi posso esportare solo uploaf
module.exports = upload;

//Multer espone da solo l uplad e il remove, non devo crearli io
