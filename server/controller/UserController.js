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
    console.log(user);
    return res.status(200).json(user);
  } catch (e) {
    return res
      .status(500)
      .json({ message: "errore server", errore: e.message });
  }
};

module.exports = {
  getUserData,
  getUserLocation,
};
