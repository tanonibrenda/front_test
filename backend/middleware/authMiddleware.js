const jwt = require('jsonwebtoken');
require('dotenv').config(); 


const authMiddleware = (req, res, next) => {
    
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ error: 'Acceso denegado, token no proporcionado' });
    }

    try {
        
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'miClaveSecretaSegura12345!');

       
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ error: 'Token no válido o expirado' });
    }
};

module.exports = authMiddleware;
