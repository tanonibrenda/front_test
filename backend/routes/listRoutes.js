const express = require('express');
const router = express.Router();
const listController = require('../controllers/listController');
const authMiddleware = require('../middleware/authMiddleware'); 

console.log('ListRoutes.js - Iniciando configuración de rutas para listas...');

router.get('/', authMiddleware, (req, res, next) => {
    console.log('ListRoutes.js - GET / - Obtener todas las listas');
    next();
}, listController.getAllListsForUser); 

router.post('/', authMiddleware, (req, res, next) => {
    console.log('ListRoutes.js - POST / - Crear una nueva lista');
    next();
}, listController.createListForUser); 

router.put('/:id', authMiddleware, (req, res, next) => {
    console.log(`ListRoutes.js - PUT /${req.params.id} - Actualizar la lista con ID ${req.params.id}`);
    next();
}, listController.updateList); 

router.delete('/:id', authMiddleware, (req, res, next) => {
    console.log(`ListRoutes.js - DELETE /${req.params.id} - Eliminar la lista con ID ${req.params.id}`);
    next();
}, listController.deleteList); 

console.log('ListRoutes.js - Configuración de rutas completada.');

module.exports = router;
