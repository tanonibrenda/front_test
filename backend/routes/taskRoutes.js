const express = require('express');
const router = express.Router();

const { getAllTasks, getTaskById, createTask, updateTask, deleteTask } = require('../controllers/taskController');
const authMiddleware = require('../middleware/authMiddleware'); 

router.get('/', authMiddleware, taskController.getAllTasks);
router.get('/api/tasks', authMiddleware, getAllTasks);
router.get('/api/tasks/:id', authMiddleware, getTaskById);
router.get('/:id', authMiddleware, taskController.getTaskById);
router.post('/', authMiddleware, taskController.createTask); 
router.post('/api/tasks', authMiddleware, createTask); 
router.put('/api/tasks/:id', authMiddleware, updateTask);
router.delete('/:id', authMiddleware, taskController.deleteTask); 
router.delete('/api/tasks/:id', authMiddleware, deleteTask);

module.exports = router;
