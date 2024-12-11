// Importar sqlite y conectar a la base de datos
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/database.db', (err) => {
    if (err) {
        console.error('List.js - Error al abrir la base de datos:', err.message);
    } else {
        console.log('List.js - Base de datos abierta correctamente en: ./db/database.db');
    }
});

// Crear tabla Lista
db.serialize(() => {
    console.log('List.js - Iniciando creación de la tabla Lista...');

    db.run(`CREATE TABLE IF NOT EXISTS Lista (
        ID_Lista INTEGER PRIMARY KEY AUTOINCREMENT,
        ID_Usuario INTEGER,
        Fecha_Creación DATE,
        Fecha_Fin DATE,
        FOREIGN KEY (ID_Usuario) REFERENCES Usuarios(ID_Usuarios)
    )`, (err) => {
        if (err) {
            console.error('List.js - Error al crear la tabla Lista:', err.message);
        } else {
            console.log('List.js - Tabla Lista creada o ya existe.');
        }
    });
});

// Exportar la base de datos para usarla en otros módulos
console.log('List.js - Base de datos lista para ser exportada');
module.exports = db;

