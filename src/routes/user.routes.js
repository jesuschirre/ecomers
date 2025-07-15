const express = require('express');
const router = express.Router();
const { User } = require('../models'); // Importar el modelo desde index.js

// @route   POST /api/users
// @desc    Registrar un nuevo usuario
// @access  Public
router.post('/', async (req, res) => {
    const { nombre, apellido, email, contraseña, rol } = req.body;
    try {
        let user = await User.findOne({ where: { email } });
        if (user) {
            return res.status(400).json({ msg: 'El usuario ya existe con este email' });
        }

        user = await User.create({
            nombre,
            apellido,
            email,
            contraseña, // El hook beforeCreate encriptará esto
            rol
        });

        // No devolver la contraseña en la respuesta
        const userRes = user.toJSON();
        delete userRes.contraseña;

        res.status(201).json({ msg: 'Usuario registrado exitosamente', user: userRes });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Error del servidor');
    }
});

// @route   GET /api/users
// @desc    Obtener todos los usuarios
// @access  Public (para fines de ejemplo, en prod sería privado/admin)
router.get('/', async (req, res) => {
    try {
        const users = await User.findAll({ attributes: { exclude: ['contraseña'] } }); // Excluir la contraseña
        res.json(users);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Error del servidor');
    }
});

// Puedes añadir más rutas: GET por ID, PUT para actualizar, DELETE para eliminar

module.exports = router;