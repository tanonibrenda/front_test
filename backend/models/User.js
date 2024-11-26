// Importar sqlite y conectar a la base de datos
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/database.db');

// Crear tabla Usuarios
db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS Usuarios (
        ID_Usuarios INTEGER PRIMARY KEY AUTOINCREMENT,
        Nombre TEXT,
        Apellido TEXT,
        Email TEXT UNIQUE,
        Contraseña TEXT
    )`);
});

// Exportar la base de datos para usarla en otros módulos
module.exports = db;
