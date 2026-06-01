const dotenv = require('dotenv') //gestore variabili d'ambiente
dotenv.config()
console.log('MONGO_URI:', process.env.MONGO_URI)

const express = require('express')
const connectDB = require('./config/db')

connectDB()

const app = express()

app.get('/', (req, res) => res.json({ message: 'BookShare API attiva' }))

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server in ascolto sulla porta ${PORT}`))