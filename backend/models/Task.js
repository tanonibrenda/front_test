const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/database.db');

// Crear tabla Tareas
db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS Tareas (
        ID_Tarea INTEGER PRIMARY KEY AUTOINCREMENT,
        ID_Lista INTEGER,
        Tarea TEXT,
        Prioridad TEXT CHECK(Prioridad IN ('Hacer', 'Planificar', 'Delegar', 'Ignorar')),
        Estado TEXT CHECK(Estado IN ('No Iniciado', 'En Curso', 'Bloqueado', 'Completado')),
        Fecha_Creación DATE,
        Fecha_Límite DATE,
        FOREIGN KEY (ID_Lista) REFERENCES Lista(ID_Lista)
    )`);
});
