const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');

console.log('UserRoutes.js - Iniciando configuración de rutas de usuario...');

// Controlador temporal para devolver los datos del usuario
router.get('/me', authMiddleware, (req, res) => {
  try {
    console.log('UserRoutes.js - GET /me - Autenticación exitosa');
    const user = req.user; 
    if (!user) {
      console.warn('UserRoutes.js - Usuario no encontrado');
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    // Envía los datos del usuario autenticado
    console.log('UserRoutes.js - Usuario autenticado:', user);
    res.json({
      userID: user.userID,
      username: user.username,
      email: user.email
    });
  } catch (error) {
    console.error('UserRoutes.js - Error al obtener los datos del usuario:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
});

// Otras rutas existentes
const authController = require('../controllers/authController'); 
router.post('/register', (req, res, next) => {
  console.log('UserRoutes.js - POST /register - Registro de usuario');
  next();
}, authController.register);

router.post('/login', (req, res, next) => {
  console.log('UserRoutes.js - POST /login - Inicio de sesión de usuario');
  next();
}, authController.login);

router.post('/logout', (req, res, next) => {
  console.log('UserRoutes.js - POST /logout - Cierre de sesión de usuario');
  next();
}, authController.logout);

console.log('UserRoutes.js - Configuración de rutas completada.');

module.exports = router;
