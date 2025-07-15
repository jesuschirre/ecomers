const express = require('express');
const router = express.Router();
const { Product, Category } = require('../models'); // Importar Product y Category

// @route   POST /api/products
// @desc    Crear un nuevo producto
// @access  Public (en prod sería privado/admin)
router.post('/', async (req, res) => {
    const { nombre, descripcion, precio, stock, sku, imagenes, categoryId } = req.body; // Cambiado de 'categoria' a 'categoryId'

    try {
        // Validar que la categoría exista
        const existingCategory = await Category.findByPk(categoryId);
        if (!existingCategory) {
            return res.status(400).json({ msg: 'La categoría especificada no existe.' });
        }

        const newProduct = await Product.create({
            nombre,
            descripcion,
            precio,
            stock,
            sku,
            imagenes,
            categoryId // Asignar el ID de la categoría
        });

        res.status(201).json(newProduct);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Error del servidor');
    }
});

// @route   GET /api/products
// @desc    Obtener todos los productos
// @access  Public
router.get('/', async (req, res) => {
    try {
        // Incluir la categoría relacionada en la consulta
        const products = await Product.findAll({
            include: [{
                model: Category,
                as: 'category', // Usar el alias definido en el modelo index.js
                attributes: ['id', 'nombre', 'slug'] // Seleccionar solo estos campos de la categoría
            }]
        });
        res.json(products);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Error del servidor');
    }
});

// @route   GET /api/products/:id
// @desc    Obtener un producto por ID
// @access  Public
router.get('/:id', async (req, res) => {
    try {
        const product = await Product.findByPk(req.params.id, {
            include: [{
                model: Category,
                as: 'category',
                attributes: ['id', 'nombre', 'slug']
            }]
        });
        if (!product) {
            return res.status(404).json({ msg: 'Producto no encontrado' });
        }
        res.json(product);
    } catch (err) {
        console.error(err.message);
        if (err.name === 'SequelizeInvalidUUIDError') { // Si el ID no tiene el formato UUID
            return res.status(400).json({ msg: 'ID de producto inválido' });
        }
        res.status(500).send('Error del servidor');
    }
});

// Puedes añadir PUT para actualizar y DELETE para eliminar

module.exports = router;