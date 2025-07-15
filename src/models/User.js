const { DataTypes } = require('sequelize');
const bcrypt = require('bcryptjs');

module.exports = (sequelize) => {
    const User = sequelize.define('User', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        nombre: {
            type: DataTypes.STRING,
            allowNull: false
        },
        apellido: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        contraseña: {
            type: DataTypes.STRING,
            allowNull: false
        },
        fecha_registro: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        },
        rol: {
            type: DataTypes.ENUM('cliente', 'admin'),
            defaultValue: 'cliente'
        }
    }, {
        tableName: 'users', // Nombre de la tabla en la DB
        timestamps: false // No queremos createdAt y updatedAt automáticos por ahora
    });

    // Hook (middleware) para encriptar la contraseña antes de guardar
    User.beforeCreate(async (user) => {
        const salt = await bcrypt.genSalt(10);
        user.contraseña = await bcrypt.hash(user.contraseña, salt);
    });

    User.beforeUpdate(async (user) => {
        if (user.changed('contraseña')) {
            const salt = await bcrypt.genSalt(10);
            user.contraseña = await bcrypt.hash(user.contraseña, salt);
        }
    });

    return User;
};