const { Sequelize } = require('sequelize');
require('dotenv').config(); // Cargar variables de entorno

// Sequelize puede parsear la DATABASE_URL directamente para la conexión
const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres', // Especificamos que es PostgreSQL
    logging: false, // Puedes cambiar a true para ver las queries SQL en consola
    dialectOptions: {
        ssl: {
            require: true, // Requerir SSL para conexiones seguras (común en Render)
            rejectUnauthorized: false // Esto puede ser necesario para bases de datos auto-firmadas, cuidado en producción
        }
    },
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});

const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('Conexión a PostgreSQL (Render) establecida exitosamente.');
        // Sincronizar modelos con la base de datos (crea las tablas si no existen)
        // Solo para desarrollo, en producción usa migraciones
        await sequelize.sync({ alter: true }); // 'alter: true' intenta hacer cambios sin borrar datos
        console.log('Modelos sincronizados con la base de datos.');
    } catch (error) {
        console.error('No se pudo conectar a la base de datos:', error);
        process.exit(1); // Salir del proceso con fallo
    }
};

module.exports = { sequelize, connectDB };