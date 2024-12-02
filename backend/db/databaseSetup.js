const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/database.db');

db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS Usuarios (
        ID_Usuarios INTEGER PRIMARY KEY AUTOINCREMENT,
        Nombre TEXT,
        Apellido TEXT,
        Email TEXT UNIQUE,
        Contraseña TEXT
    )`, (err) => {
        if (err) {
            console.error('Error al crear la tabla Usuarios:', err.message);
        } else {
            console.log('Tabla Usuarios creada o ya existe.');
        }
    });

    db.run(`CREATE TABLE IF NOT EXISTS Listas (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        userID INTEGER,
        FOREIGN KEY (userID) REFERENCES Usuarios(ID_Usuarios)
    )`, (err) => {
        if (err) {
            console.error('Error al crear la tabla Listas:', err.message);
        } else {
            console.log('Tabla Listas creada o ya existe.');
        }
    });

    db.run(`CREATE TABLE IF NOT EXISTS Tareas (
        ID_Tarea INTEGER PRIMARY KEY AUTOINCREMENT,
        ID_Lista INTEGER,
        Tarea TEXT,
        Prioridad TEXT CHECK(Prioridad IN ('Hacer', 'Planificar', 'Delegar', 'Ignorar')),
        Estado TEXT CHECK(Estado IN ('No Iniciado', 'En Curso', 'Bloqueado', 'Completado')),
        Fecha_Creación DATE,
        Fecha_Límite DATE,
        FOREIGN KEY (ID_Lista) REFERENCES Listas(id)
        userID INTEGER,
        FOREIGN KEY (userID) REFERENCES Usuarios(ID_Usuarios)
    )`, (err) => {
        if (err) {
            console.error('Error al crear la tabla Tareas:', err.message);
        } else {
            console.log('Tabla Tareas creada o ya existe.');
        }
    });
});

module.exports = db;
