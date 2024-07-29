const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');

const app = express();

// Middleware
app.use(bodyParser.json());

// Conexión a MongoDB
mongoose.connect('mongodb://localhost:27017/mi_base_de_datos', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Rutas
app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});

const redis = require('redis');
const client = redis.createClient();

client.on('error', (err) => {
    console.log('Error ' + err);
});

// Ejemplo de uso de Redis para cache
app.get('/api/data', (req, res) => {
    const userId = req.query.id;
    client.get(userId, (err, result) => {
        if (result) {
            res.send(JSON.parse(result));
        } else {
            // Lógica para obtener los datos desde la base de datos
            // y guardarlos en Redis
            const data = { id: userId, name: 'John Doe' }; // Ejemplo
            client.setex(userId, 3600, JSON.stringify(data));
            res.send(data);
        }
    });
});

