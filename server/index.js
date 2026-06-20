const dotenv = require("dotenv"); //gestore variabili d'ambiente

dotenv.config(); //configurazione variabili d' ambiente
const Approuter = require("./routes/routes"); //importo le rotte
const BookRouter = require("./routes/BooksRoutes"); //importo le rotte dei libri
const cors = require("cors");
console.log("MONGO_URI:", process.env.MONGO_URI);

const express = require("express");
const connectDB = require("./config/db");
const { connectCloudinary } = require("./config/cloudinary");
const LoanRouter = require("./routes/LoanRoutes");
const userRouter = require("./routes/UserRoutes");

connectDB();
connectCloudinary();

const app = express();

//MIDDLEWARES GLOBALI --> OGNI RICHIESTA HTTP PASSA PER TUTTI I MIDDLEWARES ; POI VIENE SMISTATA
app.use(cors()); //middleware per le richieste, necessario per  il frontand REACT
app.use(express.json()); //middleware per il parsing del body in  JSON

//MIDDLEWARES PER LE ROTTE
app.use("/api/auth", Approuter); //middleware per le rotte, tutte le rotte che iniziano con api/auth vengono gestite da routes.js
app.use("/api/books", BookRouter);
app.use("/api/loans", LoanRouter);
app.use("/api/user", userRouter);

app.get("/", (req, res) => res.json({ message: "BookShare API attiva" }));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server in ascolto sulla porta ${PORT}`));
