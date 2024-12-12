const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/database.db');

// Obtener todas las listas para un usuario
const getAllListsForUser = (req, res) => {
    const userId = req.user.userID;
    
    if (!userId){
        console.error('ListController.js - User ID no definido'); 
        res.status(401).json({ error: 'Usuario no autenticado' }); 
        return;
    }
    console.log('ListController.js - getAllListsForUser - User ID:', userId);
    const sql = 'SELECT * FROM Listas WHERE userID = ?';
    db.all(sql, [userId], (err, rows) => {
        if (err) {
            console.error('ListController.js - Error al obtener listas:', err.message);
            res.status(500).json({ error: err.message });
            return;
        }
        console.log('ListController.js - Listas obtenidas:', rows);
        res.json({ lists: rows });
    });
};

// Crear una nueva lista para un usuario
const createListForUser = (req, res) => {
    const userId = req.user.id;
    console.log('ListController.js - createListForUser - Datos recibidos:', { name: req.body.name, userId });

    const sql = 'INSERT INTO Listas (name, userID) VALUES (?, ?)';
    db.run(sql, [req.body.name, userId], function(err) {
        if (err) {
            console.error('ListController.js - Error al crear lista:', err.message);
            res.status(500).json({ error: err.message });
            return;
        }
        console.log('ListController.js - Lista creada con ID:', this.lastID);
        res.json({ id: this.lastID, name: req.body.name, userID: userId });
    });
};

// Actualizar una lista por ID
const updateList = (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    const userID = req.user.id;
    console.log('ListController.js - updateList - Datos recibidos:', { id, name, userID });

    const sql = 'UPDATE Listas SET name = ? WHERE id = ? AND userID = ?';
    db.run(sql, [name, id, userID], function(err) {
        if (err) {
            console.error(`ListController.js - Error al actualizar lista con ID ${id}:`, err.message);
            res.status(500).json({ error: err.message });
            return;
        }
        console.log(`ListController.js - Lista actualizada con ID ${id}`);
        res.json({ id, name });
    });
};

// Eliminar una lista por ID
const deleteList = (req, res) => {
    const { id } = req.params;
    const userID = req.user.id;
    console.log('ListController.js - deleteList - ID de la lista a eliminar:', id);

    const sql = 'DELETE FROM Listas WHERE id = ? AND userID = ?';
    db.run(sql, [id, userID] , function(err) {
        if (err) {
            console.error(`ListController.js - Error al eliminar lista con ID ${id}:`, err.message);
            res.status(500).json({ error: err.message });
            return;
        }
        console.log(`ListController.js - Lista eliminada con ID ${id}`);
        res.status(204).end();
    });
};

module.exports = {
    getAllListsForUser,
    createListForUser,
    updateList,
    deleteList,
};
