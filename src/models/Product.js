const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Product = sequelize.define('Product', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        nombre: {
            type: DataTypes.STRING,
            allowNull: false
        },
        descripcion: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        precio: {
            type: DataTypes.DECIMAL(10, 2), // 10 dígitos en total, 2 decimales
            allowNull: false,
            validate: {
                min: 0
            }
        },
        stock: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                min: 0
            }
        },
        sku: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: true // Puede ser nulo, pero si tiene valor, debe ser único
        },
        imagenes: {
            type: DataTypes.ARRAY(DataTypes.JSONB), // Almacena un array de objetos JSON (ej. { url: '...', isMain: true })
            defaultValue: []
        },
        activo: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        },
        fecha_creacion: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        }
        // No definimos categoryId aquí directamente, se hará en index.js por la relación
    }, {
        tableName: 'products',
        timestamps: false
    });

    return Product;
};