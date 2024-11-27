const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const taskRoutes = require('./routes/taskRoutes');
const listRoutes = require('./routes/listRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());

// Ruta básica para verificar que el servidor está funcionando
app.get('/', (req, res) => {
    res.send('Servidor Express está funcionando');
});

// Usar las rutas definidas en otros archivos
app.use('/api/users', userRoutes); 
app.use('/api/tasks', taskRoutes);
app.use('/api/lists', listRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
