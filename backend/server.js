const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');  // Importar cors
const userRoutes = require('./routes/userRoutes');
const taskRoutes = require('./routes/taskRoutes');
const listRoutes = require('./routes/listRoutes');
require('./db/databaseSetup')

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/database.db');  // Asegúrate de que la ruta es correcta

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors());  // Usar el middleware cors

app.get('/', (req, res) => {
    res.send('Servidor Express está funcionando');
});

app.use('/api/users', userRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/lists', listRoutes);

// Ruta temporal para verificar los datos de usuarios
app.get('/verify-users', (req, res) => {
    const sql = 'SELECT * FROM Usuarios';
    db.all(sql, [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ users: rows });
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
