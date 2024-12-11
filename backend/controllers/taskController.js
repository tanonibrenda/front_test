const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/database.db');

// Obtener todas las tareas
exports.getAllTasks = (req, res) => {
    const sql = 'SELECT * FROM Tareas WHERE userID = ?';
    console.log('TaskController.js - getAllTasks - Obteniendo todas las tareas para el usuario:', req.user.userID);
    db.all(sql, [req.user.userID], (err, rows) => {
        if (err) {
            console.error('TaskController.js - Error al obtener tareas:', err.message);
            res.status(500).json({ error: err.message });
            return;
        }
        console.log('TaskController.js - Tareas obtenidas:', rows);
        res.json({ tasks: rows });
    });
};

// Obtener tarea por ID
exports.getTaskById = (req, res) => {
    const { id } = req.params;
    const userID = req.user.userID;
    const sql = 'SELECT * FROM Tareas WHERE ID_Tarea = ? AND userID = ?';
    console.log(`TaskController.js - getTaskById - Obteniendo tarea con ID: ${id}`);
    db.get(sql, [id, userID], (err, row) => {
        if (err) {
            console.error(`TaskController.js - Error al obtener tarea con ID ${id}:`, err.message);
            res.status(500).json({ error: err.message });
            return;
        }
        console.log(`TaskController.js - Tarea obtenida con ID ${id}:`, row);
        res.json({ task: row });
    });
};

// Crear nueva tarea
exports.createTask = (req, res) => {
    const { ID_Lista, Tarea, Prioridad, Estado, Fecha_Creación, Fecha_Límite } = req.body;
    const userID = req.user.userID;
    console.log('TaskController.js - createTask - Creando nueva tarea con datos:', { ID_Lista, Tarea, Prioridad, Estado, Fecha_Creación, Fecha_Límite, userID });

    const sql = 'INSERT INTO Tareas (ID_Lista, Tarea, Prioridad, Estado, Fecha_Creación, Fecha_Límite) VALUES (?, ?, ?, ?, ?, ?)';
    db.run(sql, [ID_Lista, Tarea, Prioridad, Estado, Fecha_Creación, Fecha_Límite],