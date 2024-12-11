// Importar sqlite y conectar a la base de datos
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/database.db', (err) => {
    if (err) {
        console.error('User.js - Error al abrir la base de datos:', err.message);
    } else {
        console.log('User.js - Base de datos abierta correctamente en: ./db/database.db');
    }
});

// Crear tabla Usuarios
db.serialize(() => {
    console.log('User.js - Iniciando creación de la tabla Usuarios...');

    db.run(`CREATE TABLE IF NOT EXISTS Usuarios (
        ID_Usuarios INTEGER PRIMARY KEY AUTOINCREMENT,
        Nombre TEXT,
        Apellido TEXT,
        Email TEXT UNIQUE,
        Contraseña TEXT
    )`, (err) => {
        if (err) {
            console.error('User.js - Error al crear la tabla Usuarios:', err.message);
        } else {
            console.log('User.js - Tabla Usuarios creada o ya existe.');
        }
    });
});

// Exportar la base de datos para usarla en otros módulos
console.log('User.js - Base de datos lista para ser exportada');
module.exports = db;
