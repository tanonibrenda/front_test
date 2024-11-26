const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/database.db');

exports.register = (req, res) => {
    const { Nombre, Apellido, Email, Contraseña } = req.body;
    const sql = 'INSERT INTO Usuarios (Nombre, Apellido, Email, Contraseña) VALUES (?, ?, ?, ?)';
    db.run(sql, [Nombre, Apellido, Email, Contraseña], function(err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ UserID: this.lastID });
    });
};

exports.login = (req, res) => {
    const { Email, Contraseña } = req.body;
    const sql = 'SELECT * FROM Usuarios WHERE Email = ? AND Contraseña = ?';
    db.get(sql, [Email, Contraseña], (err, row) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        if (row) {
            res.json({ User: row });
        } else {
            res.status(401).json({ error: 'Invalid credentials' });
        }
    });
};
