const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const authMiddleware = require('../middleware/authMiddleware'); 

console.log('TaskRoutes.js - Iniciando configuración de rutas para tareas...');

router.get('/', authMiddleware, (req, res, next) => {
    console.log('TaskRoutes.js - GET / - Obtener todas las tareas');
    next();
}, taskController.getAllTasks); 

router.get('/:id', authMiddleware, (req, res, next) => {
    console.log(`TaskRoutes.js - GET /${req.params.id} - Obtener tarea con ID ${req.params.id}`);
    next();
}, taskController.getTaskById); 

router.post('/', authMiddleware, (req, res, next) => {
    console.log('TaskRoutes.js - POST / - Crear una nueva tarea');
    next();
}, taskController.createTask); 

router.put('/:id', authMiddleware, (req, res, next) => {
    console.log(`TaskRoutes.js - PUT /${req.params.id} - Actualizar tarea con ID ${req.params.id}`);
    next();
}, taskController.updateTask); 

router.delete('/:id', authMiddleware, (req, res, next) => {
    console.log(`TaskRoutes.js - DELETE /${req.params.id} - Eliminar tarea con ID ${req.params.id}`);
    next();
}, taskController.deleteTask); 

console.log('TaskRoutes.js - Configuración de rutas completada.');

module.exports = router;
