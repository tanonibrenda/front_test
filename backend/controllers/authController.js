const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/database.db');

// Controlador de Registro de Usuario
exports.register = (req, res) => {
    const { Nombre, Apellido, Email, Contraseña } = req.body;
    const sql = 'INSERT INTO Usuarios (Nombre, Apellido, Email, Contraseña) VALUES (?, ?, ?, ?)';
    console.log('Intentando registrar usuario:', { Nombre, Apellido, Email });
    db.run(sql, [Nombre, Apellido, Email, Contraseña], function(err) {
        if (err) {
            console.error('Error al insertar el usuario:', err.message);
            res.status(500).json({ error: err.message });
            return;
        }
        console.log(`Usuario registrado con ID: ${this.lastID}`);
        res.json({ UserID: this.lastID });
    });
};

// Controlador de Login de Usuario
exports.login = (req, res) => { 
    const { Email, Contraseña } = req.body; 
    const sql = 'SELECT * FROM Usuarios WHERE Email = ? AND Contraseña = ?';
    console.log('Intentando iniciar sesión para el email:', Email);
    db.get(sql, [Email, Contraseña], (err, row) => {
        if (err) {
            console.error('Error al buscar usuario:', err.message);
            res.status(500).json({ error: err.message });
            return;
        }
        if (row) {
            console.log(`Usuario encontrado: ${row.Nombre}`);
            console.log(`Ingreso exitoso con el nombre de usuario: ${row.Nombre}`);
            res.json({ User: row });
        } else {
            console.log('Usuario no encontrado');
            res.status(401).json({ error: 'Invalid credentials' });
        }
    });
};
