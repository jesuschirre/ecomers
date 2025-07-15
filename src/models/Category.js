const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Category = sequelize.define('Category', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        nombre: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        descripcion: {
            type: DataTypes.TEXT
        },
        slug: {
            type: DataTypes.STRING,
            unique: true,
            set(value) {
                // Generar slug automáticamente o usar el valor proporcionado
                this.setDataValue('slug', value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s/g, '-').toLowerCase());
            }
        }
    }, {
        tableName: 'categories',
        timestamps: false
    });

    return Category;
};