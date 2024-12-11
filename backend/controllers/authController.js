const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/database.db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config(); 

// Registro de un nuevo usuario
exports.register = (req, res) => {
    const { Nombre, Apellido, Email, Contraseña } = req.body;
    console.log('Datos recibidos para registro:', { Nombre, Apellido, Email, Contraseña });

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(Contraseña, salt);
    console.log('Contraseña encriptada:', hashedPassword);

    const sql = 'INSERT INTO Usuarios (Nombre, Apellido, Email, Contraseña) VALUES (?, ?, ?, ?)';
    db.run(sql, [Nombre, Apellido, Email, hashedPassword], function(err) {
        if (err) {
            console.error('Error al registrar usuario:', err.message);
            res.status(500).json({ error: err.message });
            return;
        }
        console.log('Usuario registrado con ID:', this.lastID);
        res.json({ userID: this.lastID });
    });
};

// Inicio de sesión de un usuario
exports.login = (req, res) => {
    const { Email, Contraseña } = req.body;
    console.log('Intento de inicio de sesión con email:', Email);

    const sql = 'SELECT * FROM Usuarios WHERE Email = ?';
    db.get(sql, [Email], (err, user) => {
        if (err) {
            console.error('Error al iniciar sesión:', err.message);
            res.status(500).json({ error: err.message });
            return;
        }
        if (!user) {
            console.warn('Usuario no encontrado para el email:', Email);
            res.status(404).json({ error: 'Usuario no encontrado' });
            return;
        }
        console.log('Usuario encontrado:', user);

        const validPassword = bcrypt.compareSync(Contraseña, user.Contraseña);
        if (!validPassword) {
            console.warn('Contraseña incorrecta para el usuario:', Email);
            res.status(401).json({ error: 'Contraseña incorrecta' });
            return;
        }
        console.log('Contraseña válida, generando token...');

        // Verificación de la carga de la clave secreta JWT
        console.log('JWT_SECRET:', process.env.JWT_SECRET); 

        const token = jwt.sign({ userID: user.ID_Usuarios }, process.env.JWT_SECRET, { expiresIn: '1h' });
        console.log('Token generado:', token);

        res.json({ token, user });
    });
};

// Cierre de sesión de un usuario
exports.logout = (req, res) => {
    console.log('Cerrando sesión del usuario');
    res.clearCookie('token');
    res.json({ message: 'Cierre de sesión exitoso' });
};
