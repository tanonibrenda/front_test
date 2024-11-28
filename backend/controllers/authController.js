const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/database.db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.register = (req, res) => {
    const { Nombre, Apellido, Email, Contraseña } = req.body;
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(Contraseña, salt);

    const sql = 'INSERT INTO Usuarios (Nombre, Apellido, Email, Contraseña) VALUES (?, ?, ?, ?)';
    db.run(sql, [Nombre, Apellido, Email, hashedPassword], function(err) {
        if (err) {
            console.error('Error al registrar usuario:', err.message);
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ userID: this.lastID });
    });
};

exports.login = (req, res) => {
    const { Email, Contraseña } = req.body;
    const sql = 'SELECT * FROM Usuarios WHERE Email = ?';
    db.get(sql, [Email], (err, user) => {
        if (err) {
            console.error('Error al iniciar sesión:', err.message);
            res.status(500).json({ error: err.message });
            return;
        }
        if (!user) {
            res.status(404).json({ error: 'Usuario no encontrado' });
            return;
        }
        const validPassword = bcrypt.compareSync(Contraseña, user.Contraseña);
        if (!validPassword) {
            res.status(401).json({ error: 'Contraseña incorrecta' });
            return;
        }
        const token = jwt.sign({ userID: user.ID_Usuarios }, 'secretKey', { expiresIn: '1h' });
        res.json({ token, user });
    });
};

exports.logout = (req, res) => {
    res.clearCookie('token');
    res.json({ message: 'Cierre de sesión exitoso' });
};
