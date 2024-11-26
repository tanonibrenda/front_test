const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/database.db');

exports.getAllTasks = (req, res) => {
    const sql = 'SELECT * FROM Tareas';
    db.all(sql, [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ tasks: rows });
    });
};

exports.getTaskById = (req, res) => {
    const { id } = req.params;
    const sql = 'SELECT * FROM Tareas WHERE ID_Tarea = ?';
    db.get(sql, [id], (err, row) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ task: row });
    });
};

exports.createTask = (req, res) => {
    const { ID_Lista, Tarea, Prioridad, Estado, Fecha_Creación, Fecha_Límite } = req.body;
    const sql = 'INSERT INTO Tareas (ID_Lista, Tarea, Prioridad, Estado, Fecha_Creación, Fecha_Límite) VALUES (?, ?, ?, ?, ?, ?)';
    db.run(sql, [ID_Lista, Tarea, Prioridad, Estado, Fecha_Creación, Fecha_Límite], function(err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ taskID: this.lastID });
    });
};

exports.updateTask = (req, res) => {
    const { id } = req.params;
    const { Tarea, Prioridad, Estado, Fecha_Límite } = req.body;
    const sql = 'UPDATE Tareas SET Tarea = ?, Prioridad = ?, Estado = ?, Fecha_Límite = ? WHERE ID_Tarea = ?';
    db.run(sql, [Tarea, Prioridad, Estado, Fecha_Límite, id], function(err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ message: 'Task updated successfully' });
    });
};

exports.deleteTask = (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM Tareas WHERE ID_Tarea = ?';
    db.run(sql, id, function(err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ message: 'Task deleted successfully' });
    });
};
