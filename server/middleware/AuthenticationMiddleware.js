//middleware di express, per la protezione delle routes.

const jwt = require('jsonwebtoken');
const User = require('../model/User');

const protectionMiddleware = async (req, res, next) => { //nel middleware ho bisogno di next, significa passare al controller o al prossimo middleware
    try {
        let headerToken = req.headers.authorization;
        if (headerToken) {
            if (headerToken.startsWith('Bearer ')) {
                let token = headerToken.split(' ')[1]; //il token è Bearer + space + token
                let decoded = jwt.verify(token, process.env.JWT_SECRET); //verifica del token
                req.user = await User.findById(decoded.id).select('-password'); //prendo l'utente dal db, meno la password
                next(); //vai al controller
            } else {
                return res.status(401).json({ message: 'autenticazione fallita, token non valido' })
            }

        } else {
            return res.status(401).json({ message: 'autorizzazione fallita, token mancante' })
        }
    } catch (error) {
        res.status(401).json({ message: 'autenticazione fallita, token non valido' }, error = error.message)
    }
}
module.exports = protectionMiddleware;