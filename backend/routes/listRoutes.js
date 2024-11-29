const express = require('express');
const router = express.Router();
const listController = require('../controllers/listController');
const authMiddleware = require('../middleware/authMiddleware'); // Importar el middleware de autenticación

router.get('/', authMiddleware, listController.getAllListsForUser); // Proteger la ruta con el middleware
router.post('/', authMiddleware, listController.createListForUser); // Proteger la ruta con el middleware
router.put('/:id', authMiddleware, listController.updateList); // Proteger la ruta con el middleware
router.delete('/:id', authMiddleware, listController.deleteList); // Proteger la ruta con el middleware

module.exports = router;
