const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const authMiddleware = require('../middleware/authMiddleware'); // Importar el middleware de autenticación

router.get('/', authMiddleware, taskController.getAllTasks); // Proteger la ruta con el middleware
router.get('/:id', authMiddleware, taskController.getTaskById); // Proteger la ruta con el middleware
router.post('/', authMiddleware, taskController.createTask); // Proteger la ruta con el middleware
router.put('/:id', authMiddleware, taskController.updateTask); // Proteger la ruta con el middleware
router.delete('/:id', authMiddleware, taskController.deleteTask); // Proteger la ruta con el middleware

module.exports = router;
