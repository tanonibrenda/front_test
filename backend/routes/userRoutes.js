const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');

// Controlador temporal para devolver los datos del usuario
router.get('/me', authMiddleware, (req, res) => {
  try {
    const user = req.user; 
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    // Envía los datos del usuario autenticado
    res.json({
      userID: user.userID,
      username: user.username,
      email: user.email
    });
  } catch (error) {
    console.error('Error al obtener los datos del usuario:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
});

// Otras rutas existentes
const authController = require('../controllers/authController'); 
router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/logout', authController.logout);

module.exports = router;
