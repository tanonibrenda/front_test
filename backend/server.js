const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');  
const userRoutes = require('./routes/userRoutes');
const taskRoutes = require('./routes/taskRoutes');
const listRoutes = require('./routes/listRoutes');
const contactRoutes = require('./routes/contactRoutes');
const authMiddleware = require('./middleware/authMiddleware');

require('dotenv').config();

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/database.db', (err) => {
    if (err) {
        console.error('Server.js - Error al abrir la base de datos:', err.message);
    } else {
        console.log('Server.js - Base de datos abierta correctamente en: ./db/database.db');
    }
});  

const app = express();
const PORT = process.env.PORT || 5000;

console.log('Server.js - Configurando middlewares...');
app.use(bodyParser.json());
app.use(cors());  

console.log('Server.js - Configurando rutas...');

app.get('/', (req, res) => {
    console.log('Server.js - GET / - Verificar funcionamiento del servidor');
    res.send('Servidor Express está funcionando');
});

app.use('/api/users', (req, res, next) => {
    console.log('Server.js - Middleware para /api/users');
    next();
}, userRoutes);

app.use('/api/tasks', authMiddleware, (req, res, next) => {
    console.log('Server.js - Middleware de autenticación y ruta /api/tasks');
    next();
}, taskRoutes);

app.use('/api/lists', authMiddleware, (req, res, next) => {
    console.log('Server.js - Middleware de autenticación y ruta /api/lists');
    next();
}, listRoutes);

app.use('/api/contact', authMiddleware, (req, res, next) => {
    console.log('Server.js - Middleware de autenticación y ruta /api/contact');
    next();
}, contactRoutes); 

// Ruta temporal para verificar los datos de usuarios
app.get('/verify-users', (req, res) => {
    const sql = 'SELECT * FROM Usuarios';
    console.log('Server.js - GET /verify-users - Verificar datos de usuarios');
    db.all(sql, [], (err, rows) => {
        if (err) {
            console.error('Server.js - Error al obtener usuarios:', err.message);
            res.status(500).json({ error: err.message });
            return;
        }
        console.log('Server.js - Usuarios obtenidos:', rows);
        res.json({ users: rows });
    });
});

console.log('Server.js - Configuración de rutas completada.');

app.listen(PORT, () => {
    console.log(`Server.js - Server is running on port ${PORT}`);
    console.log(`Server.js - Escuchando en http://localhost:${PORT}`);
});

// Manejo de errores generales
app.use((err, req, res, next) => {
    console.error('Server.js - Error del servidor:', err.message);
    res.status(500).json({ error: 'Error interno del servidor' });
});
