const express = require('express');
const router = express.Router();
const { Category } = require('../models');

// @route   POST /api/categories
// @desc    Crear una nueva categoría
// @access  Public (en prod sería privado/admin)
router.post('/', async (req, res) => {
    const { nombre, descripcion } = req.body;
    try {
        let category = await Category.findOne({ where: { nombre } });
        if (category) {
            return res.status(400).json({ msg: 'La categoría ya existe' });
        }

        // El setter de slug se encargará de generar el slug automáticamente si lo pasas en 'nombre'
        category = await Category.create({
            nombre,
            descripcion,
            slug: nombre // Pasa el nombre para que el setter lo convierta en slug
        });

        res.status(201).json(category);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Error del servidor');
    }
});

// @route   GET /api/categories
// @desc    Obtener todas las categorías
// @access  Public
router.get('/', async (req, res) => {
    try {
        const categories = await Category.findAll();
        res.json(categories);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Error del servidor');
    }
});

// Puedes añadir GET por ID, PUT para actualizar y DELETE para eliminar

module.exports = router;