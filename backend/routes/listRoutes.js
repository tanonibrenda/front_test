const express = require('express');
const router = express.Router();
const listController = require('../controllers/listController');
const authMiddleware = require('../middleware/authMiddleware'); 

router.get('/', authMiddleware, listController.getAllListsForUser); 
router.post('/', authMiddleware, listController.createListForUser); 
router.put('/:id', authMiddleware, listController.updateList); 
router.delete('/:id', authMiddleware, listController.deleteList); 

module.exports = router;
