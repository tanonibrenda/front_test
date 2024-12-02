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
const db = new sqlite3.Database('./db/database.db');  

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors());  

app.get('/', (req, res) => {
    res.send('Servidor Express está funcionando');
});

app.use('/api/users', userRoutes);

// Agregar middleware de autenticación a las rutas protegidas
app.use('/api/tasks', authMiddleware, taskRoutes);
app.use('/api/lists', authMiddleware, listRoutes);
app.use('/api/contact', authMiddleware, contactRoutes); 

// Ruta temporal para verificar los datos de usuarios (?)
app.get('/verify-users', (req, res) => {
    const sql = 'SELECT * FROM Usuarios';
    db.all(sql, [], (err, rows) => {
        if (err) {
            console.error('Error al obtener usuarios:', err.message);
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ users: rows });
    });
});

// Agregar más logs en el servidor
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`Escuchando en http://localhost:${PORT}`);
});

// Manejo de errores generales
app.use((err, req, res, next) => {
    console.error('Error del servidor:', err.message);
    res.status(500).json({ error: 'Error interno del servidor' });
});
