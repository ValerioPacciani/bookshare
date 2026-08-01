const User = require("../model/User.js");

const getUserLocation = async (req, res) => {
  try {
    const userId = req.user._id; //id presente nel context
    if (!userId) {
      return res.status(404).json({ message: "utente inesistente" }); //this sould never happen becouse we are logged in the context
    }
    const user = await User.findById(userId);
    const userLocation = user.location;
    return res.status(200).json(userLocation);
  } catch (error) {
    console.log("Error on location retrieve : ", error.message);
    return res.status(500).json({ message: "Errore" });
  }
};

const getUserData = async (req, res) => {
  try {
    const userId = req.user._id;
    if (!userId) {
      return res.status(404).json({ message: "utente inesistente" });
    }
    const user = await User.findById(userId);
    //console.log(user);
    return res.status(200).json(user);
  } catch (e) {
    return res
      .status(500)
      .json({ message: "errore server", errore: e.message });
  }
};


const getExternalUserData = async(req,res) => {
  try{  
    const userId = req.params.id;
    if (!userId) {
      return res.status(404).json({message:"utente inesistente"})
    }
    const user = await User.findById(userId);
    console.log(user)
    return res.status(200).json(user);

  } catch (e)
  { 
    console.log(e.message)
    return res.status(500).json({message: e.message})}
}


//immagini

const updateGenresImages = async(req,res) => {
  try {
    const UserId = req.user._id;
      if (!userId) {
        return res.status(404).json({message:"utente inesistente"})
      }
    const genre = req.params.genre
      if (!genre) {
        //TODO magari mettere un cotrollo sulle categorie disponibili
        return res.status(404).json({message:"genere inesistente"})
      }
    let genre_image =  req.file.path;
    if(!genre_image) {
      return res.status(404).json({message:"immagine non trovata"})
    } 
    const updatedUser = await User.findByIdAndUpdate(UserId,
      {$set: {
        genres_images:{
          genres :  genre_image
        }
      }
    },
    {new: true} //questo serve per far tornare a mongo il valore aggiornato e non il precedente
    )
 
    return res.status(200).json({message: "immagini aggiornate"})
  }
  
  catch(e) {
    console.log(e.message)
   return  res.status(500).json({message : e.message})
  }




}


const getGenreImage = async(req,res) => {
  try {
    const UserId = req.user._id
    if (!UserId) {
        return res.status(404).json({message:"utente inesistente"})
      }

      //TOFIX ritorna un oggetto vuoto
    const userselected = await User.findById(UserId).select("genres_images -_id").lean() //lean mi permette di non far tornare un moongoose document ma direttamente un json, tanto in questo caso non ho bisogno di funzioni moongose, risparmio CPU 
  
    
    return res.status(200).json(userselected);
      
  } catch (e)
    {
      console.log("error:",e)
      return res.status(500).json({message:"server error"})
  }


}

module.exports = {
  getUserData,
  getUserLocation,
  getExternalUserData,
  updateGenresImages,
  getGenreImage,
};
