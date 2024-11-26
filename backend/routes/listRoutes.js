// routes/listRoutes.js
const express = require('express');
const router = express.Router();
const listController = require('../controllers/listController');

router.get('/lists', listController.getAllLists);
router.post('/lists', listController.createList);
router.put('/lists/:id', listController.updateList);
router.delete('/lists/:id', listController.deleteList);

module.exports = router;
