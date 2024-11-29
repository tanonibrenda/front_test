const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1]; // Verificar el token en el encabezado de autorización
    if (!token) {
        return res.status(401).json({ error: 'No autorizado' }); // Devolver 401 si no hay token
    }

    try {
        const decoded = jwt.verify(token, 'miClaveSecretaSegura12345!');
        // Reemplaza 'secretKey' con tu clave secreta
        req.user = decoded; // Adjuntar la información del usuario decodificada a req.user
        next(); // Pasar al siguiente middleware o controlador
    } catch (error) {
        return res.status(401).json({ error: 'Token no válido' }); // Devolver 401 si el token es inválido
    }
};

module.exports = authMiddleware;
