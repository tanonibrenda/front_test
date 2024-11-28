const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/database.db');

// Obtener todas las tareas
exports.getAllTasks = (req, res) => {
    const sql = 'SELECT * FROM Tareas';
    console.log('Obteniendo todas las tareas');
    db.all(sql, [], (err, rows) => {
        if (err) {
            console.error('Error al obtener tareas:', err.message);
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ tasks: rows });
    });
};

// Obtener tarea por ID
exports.getTaskById = (req, res) => {
    const { id } = req.params;
    const sql = 'SELECT * FROM Tareas WHERE ID_Tarea = ?';
    console.log(`Obteniendo tarea con ID: ${id}`);
    db.get(sql, [id], (err, row) => {
        if (err) {
            console.error(`Error al obtener tarea con ID ${id}:`, err.message);
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ task: row });
    });
};

// Crear nueva tarea
exports.createTask = (req, res) => {
    const { ID_Lista, Tarea, Prioridad, Estado, Fecha_Creación, Fecha_Límite } = req.body;
    const sql = 'INSERT INTO Tareas (ID_Lista, Tarea, Prioridad, Estado, Fecha_Creación, Fecha_Límite) VALUES (?, ?, ?, ?, ?, ?)';
    console.log('Creando nueva tarea:', { ID_Lista, Tarea, Prioridad, Estado, Fecha_Creación, Fecha_Límite });
    db.run(sql, [ID_Lista, Tarea, Prioridad, Estado, Fecha_Creación, Fecha_Límite], function(err) {
        if (err) {
            console.error('Error al crear tarea:', err.message);
            res.status(500).json({ error: err.message });
            return;
        }
        console.log(`Tarea creada con ID: ${this.lastID}`);
        res.json({
            task: {
                ID_Lista,
                Tarea,
                Prioridad,
                Estado,
                Fecha_Creación,
                Fecha_Límite,
                id: this.lastID
            }
        });
    });
};

// Actualizar tarea por ID
exports.updateTask = (req, res) => {
    const { id } = req.params;
    const { Tarea, Prioridad, Estado, Fecha_Límite } = req.body;
    const sql = 'UPDATE Tareas SET Tarea = ?, Prioridad = ?, Estado = ?, Fecha_Límite = ? WHERE ID_Tarea = ?';
    console.log(`Actualizando tarea con ID ${id}:`, { Tarea, Prioridad, Estado, Fecha_Límite });
    db.run(sql, [Tarea, Prioridad, Estado, Fecha_Límite, id], function(err) {
        if (err) {
            console.error(`Error al actualizar tarea con ID ${id}:`, err.message);
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ message: 'Task updated successfully' });
    });
};

// Eliminar tarea por ID
exports.deleteTask = (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM Tareas WHERE ID_Tarea = ?';
    console.log(`Eliminando tarea con ID: ${id}`);
    db.run(sql, id, function(err) {
        if (err) {
            console.error(`Error al eliminar tarea con ID ${id}:`, err.message);
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ message: 'Task deleted successfully' });
    });
};

