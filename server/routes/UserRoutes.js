const express = require("express");
const controller = require("../controller/UserController");
const protectionMiddleware = require("../middleware/AuthenticationMiddleware");
const imagesMiddleware = require("../middleware/ImagesUploaderMiddleware");

const userRouter = express.Router();

//for not the active user, but for the external ones
userRouter.get("/external/data/:id",protectionMiddleware,controller.getExternalUserData)
userRouter.get("/genres_images",protectionMiddleware,controller.getGenreImage)

userRouter.post("/genres_images/:genre",protectionMiddleware,imagesMiddleware.single("genre_image"),controller.updateGenresImages)

userRouter.get(
  "/userlocation",
  protectionMiddleware,
  controller.getUserLocation,
);
userRouter.get("/data", protectionMiddleware, controller.getUserData);

module.exports = userRouter;
