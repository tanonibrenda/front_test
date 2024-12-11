const jwt = require('jsonwebtoken');
require('dotenv').config(); 

const authMiddleware = (req, res, next) => {
    console.log('AuthMiddleware.js - Iniciando autenticación de middleware...');
    
    const token = req.headers.authorization?.split(' ')[1];
    console.log('AuthMiddleware.js - Token recibido:', token);
    
    if (!token) {
        console.warn('AuthMiddleware.js - Acceso denegado, token no proporcionado');
        return res.status(401).json({ error: 'Acceso denegado, token no proporcionado' });
    }

    try {
        console.log('AuthMiddleware.js - Verificando token...');
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'miClaveSecretaSegura12345!');
        console.log('AuthMiddleware.js - Token verificado con éxito:', decoded);

        req.user = decoded;
        console.log('AuthMiddleware.js - Usuario autenticado:', req.user);
        next();
    } catch (error) {
        console.error('AuthMiddleware.js - Error al verificar el token:', error.message);
        return res.status(401).json({ error: 'Token no válido o expirado' });
    }
};

module.exports = authMiddleware;

