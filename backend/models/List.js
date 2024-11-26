// Importar sqlite y conectar a la base de datos
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/database.db');

// Crear tabla Lista
db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS Lista (
        ID_Lista INTEGER PRIMARY KEY AUTOINCREMENT,
        ID_Usuario INTEGER,
        Fecha_Creación DATE,
        Fecha_Fin DATE,
        FOREIGN KEY (ID_Usuario) REFERENCES Usuarios(ID_Usuarios)
    )`);
});

// Exportar la base de datos para usarla en otros módulos
module.exports = db;
