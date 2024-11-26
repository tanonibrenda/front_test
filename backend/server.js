//llamar a sqlite y express
const express = require('express');
const sqlite3 = require('sqlite3').verbose();

//llmar bodyparser para analizar y procesar solicitudes HTTP
const bodyParser = require('body-parser');

//llamar a rutas
const authRoutes = require('./routes/authRoutes');
const listRoutes = require('./routes/listRoutes');
const taskRoutes = require('./routes/taskRoutes');

const app = express();
const db = new sqlite3.Database('./db/database.db');

// Middlewares
app.use(bodyParser.json());

// Routes
app.use('/auth', authRoutes);
app.use('/lists', listRoutes);
app.use('/tasks', taskRoutes);

// Iniciar Servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
