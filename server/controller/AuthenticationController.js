
const User = require('../model/User');

const bycript = require('bcryptjs');
const jwt = require('jsonwebtoken');

const generateToken = (id) => {
    //creazione token, prendo come corpo solo l id, perchè non è criptato. Process.env.JWT
    //secret è una stringa segreta di conoscenza solo del server.
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '10d' })
}

const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body; //prendo i dati dal body della richiesta
        //validazione campi
        if (!name || !email || !password) {
            return res.status(400).json({ message: 'tutti i campi sono obbligatori!' }); //ritorno perchè cosi inpedisco di eseguire le istruzioni successive
        }
        const AlreadyUser = await User.findOne({ email: email }); //moongose findone, trova un utente 
        //validazione per duplicati
        if (AlreadyUser) {
            return res.status(400).json({ message: 'Email gia registrata' });
        }
        //creazione password criptata
        const salt = await bycript.genSalt(10); //genera un sale, più è alto più è sicuro ma più è lento
        const hashedPassword = await bycript.hash(password, salt); //hasha la password con il sale
        //creazione utente, direttamente al db
        const user = await User.create({
            name,
            email,
            password: hashedPassword //non salvo mai la password in chiaro, privacy by design
        });
        //ritorno token e utente
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })


    } catch (error) {
        res.status(500).json({ message: 'Server error' }, error = error.message);
    }
}





const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body; //prendo i dati dal body della richiesta
        const user = await User.findOne({ email: email });
        //verifica delle credenziali
        if (!user) {
            return res.status(400).json({ message: 'credenziali non valide' });
        }
        //verifica password
        const match = await bycript.compare(password, user.password)
        if (!match) {
            return res.status(401).json({ message: 'Credenziali non valide' })
        } else {
            res.status(200).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                token: generateToken(user._id)
            })
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}


module.exports = {
    registerUser,
    loginUser
}  //esporto le funzioni, per NODE JS