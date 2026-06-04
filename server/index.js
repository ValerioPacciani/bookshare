const dotenv = require('dotenv') //gestore variabili d'ambiente

dotenv.config()
const Approuter = require('./routes/routes') //importo le rotte
const cors = require('cors')
console.log('MONGO_URI:', process.env.MONGO_URI)

const express = require('express')
const connectDB = require('./config/db')

connectDB()

const app = express()

//MIDDLEWARES GLOBALI --> OGNI RICHIESTA HTTP PASSA PER TUTTI I MIDDLEWARES ; POI VIENE SMISTATA
app.use(cors()) //middleware per le richieste, necessario per  il frontand REACT
app.use(express.json()) //middleware per il parsing del body in  JSON
app.use('/api/auth', Approuter) //middleware per le rotte, tutte le rotte che iniziano con api/auth vengono gestite da routes.js


app.get('/', (req, res) => res.json({ message: 'BookShare API attiva' }))

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server in ascolto sulla porta ${PORT}`))