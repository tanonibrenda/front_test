// Importar sqlite y conectar a la base de datos
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/database.db', (err) => {
    if (err) {
        console.error('Task.js - Error al abrir la base de datos:', err.message);
    } else {
        console.log('Task.js - Base de datos abierta correctamente en: ./db/database.db');
    }
});

// Crear tabla Tareas
db.serialize(() => {
    console.log('Task.js - Iniciando creación de la tabla Tareas...');

    db.run(`CREATE TABLE IF NOT EXISTS Tareas (
        ID_Tarea INTEGER PRIMARY KEY AUTOINCREMENT,
        ID_Lista INTEGER,
        Tarea TEXT,
        Prioridad TEXT CHECK(Prioridad IN ('Hacer', 'Planificar', 'Delegar', 'Ignorar')),
        Estado TEXT CHECK(Estado IN ('No Iniciado', 'En Curso', 'Bloqueado', 'Completado')),
        Fecha_Creación DATE,
        Fecha_Límite DATE,
        FOREIGN KEY (ID_Lista) REFERENCES Lista(ID_Lista)
    )`, (err) => {
        if (err) {
            console.error('Task.js - Error al crear la tabla Tareas:', err.message);
        } else {
            console.log('Task.js - Tabla Tareas creada o ya existe.');
        }
    });
});

// Exportar la base de datos para usarla en otros módulos
console.log('Task.js - Base de datos lista para ser exportada');
module.exports = db;

