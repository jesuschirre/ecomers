const express = require('express');
const { connectDB } = require('./config/database');
const cors = require('cors'); // Importa el paquete cors
const cartRoutes = require('./routes/cartRoutes.routes');

// Conectar a la base de datos y sincronizar modelos
connectDB();

const app = express();

// --- Configuración de CORS ---
// Opción 1: Permitir todas las solicitudes CORS (para desarrollo, menos seguro en prod)
app.use(cors());

// Opción 2: Configuración más específica para CORS (recomendado para producción)
/*
const corsOptions = {
    origin: 'http://localhost:3000', // Reemplaza con el dominio de tu frontend
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Habilita el envío de cookies o encabezados de autorización
    optionsSuccessStatus: 204 // Algunas herramientas (como Postman) prefieren este estado para OPTIONS
};
app.use(cors(corsOptions));
*/
// --- Fin de Configuración de CORS ---


// Middleware para parsear JSON
app.use(express.json({ extended: false }));

// Definir rutas
app.use('/api/users', require('./routes/user.routes'));
app.use('/api/products', require('./routes/product.routes'));
app.use('/api/categories', require('./routes/category.routes'));
app.use('/api/cart', cartRoutes);

// Ruta de prueba
app.get('/', (req, res) => {
    res.send('API de eCommerce (Relacional) funcionando!');
});

module.exports = app;