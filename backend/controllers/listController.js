//operaciones CRUD
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/database.db');

// Obtener todas las listas para un usuario
const getAllListsForUser = (req, res) => {
    const userId = req.user.id;
    const sql = 'SELECT * FROM Listas WHERE userID = ?';
    db.all(sql, [userId], (err, rows) => {
        if (err) {
            console.error('Error al obtener listas:', err.message);
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ lists: rows });
    });
};

// Crear una nueva lista para un usuario
const createListForUser = (req, res) => {
    const userId = req.user.id;
    const sql = 'INSERT INTO Listas (name, userID) VALUES (?, ?)';
    db.run(sql, [req.body.name, userId], function(err) {
        if (err) {
            console.error('Error al crear lista:', err.message);
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ id: this.lastID, name: req.body.name, userID: userId });
    });
};

// Actualizar una lista por ID
const updateList = (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    const userID = req.user.id;
    const sql = 'UPDATE Listas SET name = ? WHERE id = ? AND userID = ?';
    db.run(sql, [name, id, userID], function(err) {
        if (err) {
            console.error(`Error al actualizar lista con ID ${id}:`, err.message);
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ id, name });
    });
};

// Eliminar una lista por ID
const deleteList = (req, res) => {
    const { id } = req.params;
    const userID = req.user.id;
    const sql = 'DELETE FROM Listas WHERE id = ? AND userID = ?';
    db.run(sql, [id, userID] , function(err) {
        if (err) {
            console.error(`Error al eliminar lista con ID ${id}:`, err.message);
            res.status(500).json({ error: err.message });
            return;
        }
        res.status(204).end();
    });
};

module.exports = {
    getAllListsForUser,
    createListForUser,
    updateList,
    deleteList,
};
