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

    const sql = 'INSERT INTO Tareas (ID_Lista, Tarea, Prioridad, Estado, Fecha_Creación, Fecha_Límite, userID) VALUES (?, ?, ?, ?, ?, ?, ?)';
    db.run(sql, [ID_Lista, Tarea, Prioridad, Estado, Fecha_Creación, Fecha_Límite, userID], function(err) {
        if (err) {
            console.error('TaskController.js - Error al crear tarea:', err.message);
            res.status(500).json({ error: err.message });
            return;
        }
        console.log('TaskController.js - Tarea creada con ID:', this.lastID);
        const sqlSelect = 'SELECT * FROM Tareas WHERE ID_Tarea = ?'; 
        db.get(sqlSelect, [this.lastID], (err, row) => { 
            if (err) {
                console.error('TaskController.js - Error al obtener la tarea recién creada:', err.message);        
                res.status(500).json({ error: err.message }); 
                return; 
            }
             console.log('TaskController.js - Tarea recién creada:', row); 
             res.json({ task: row });
            });
        // console.log('TaskController.js - Tarea creada con ID:', this.lastID);
        // res.json({ taskID: this.lastID });
    });
};

// Actualizar tarea por ID
exports.updateTask = (req, res) => {
    const { id } = req.params;
    const { ID_Lista, Tarea, Prioridad, Estado, Fecha_Creación, Fecha_Límite } = req.body;
    const userID = req.user.userID;
    console.log('TaskController.js - updateTask - Actualizando tarea con ID:', id, 'y datos:', { ID_Lista, Tarea, Prioridad, Estado, Fecha_Creación, Fecha_Límite, userID });

    const sql = 'UPDATE Tareas SET ID_Lista = ?, Tarea = ?, Prioridad = ?, Estado = ?, Fecha_Creación = ?, Fecha_Límite = ? WHERE ID_Tarea = ? AND userID = ?';
    db.run(sql, [ID_Lista, Tarea, Prioridad, Estado, Fecha_Creación, Fecha_Límite, id, userID], function(err) {
        if (err) {
            console.error('TaskController.js - Error al actualizar tarea con ID:', id, err.message);
            res.status(500).json({ error: err.message });
            return;
        }
        console.log('TaskController.js - Tarea actualizada con ID:', id);
        // res.json({ message: 'Tarea actualizada correctamente' });

        const sqlSelect = 'SELECT * FROM Tareas WHERE ID_Tarea = ?'; 
        db.get(sqlSelect, [id], (err, row) => { 
            if (err) { 
                console.error('TaskController.js - Error al obtener la tarea actualizada:', err.message);
                res.status(500).json({ error: err.message }); 
                return;
             }
              console.log('TaskController.js - Tarea actualizada:', row); 
              res.json({ task: row });
    });
    });
};

// Eliminar tarea por ID
exports.deleteTask = (req, res) => {
    const { id } = req.params;
    const userID = req.user.userID;
    console.log('TaskController.js - deleteTask - Eliminando tarea con ID:', id);

    const sql = 'DELETE FROM Tareas WHERE ID_Tarea = ? AND userID = ?';
    db.run(sql, [id, userID], function(err) {
        if (err) {
            console.error('TaskController.js - Error al eliminar tarea con ID:', id, err.message);
            res.status(500).json({ error: err.message });
            return;
        }
        console.log('TaskController.js - Tarea eliminada con ID:', id);
        res.json({ message: 'Tarea eliminada correctamente' });
    });
};
