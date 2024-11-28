const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController'); // Importar el controlador de tareas

router.get('/', taskController.getAllTasks);
router.get('/:id', taskController.getTaskById);
router.post('/', taskController.createTask);
router.put('/:id', taskController.updateTask);
router.delete('/:id', taskController.deleteTask); // Asegúrate de que deleteTask esté correctamente importado y definido

module.exports = router;
