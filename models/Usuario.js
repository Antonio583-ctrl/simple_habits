const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const bcrypt = require('bcryptjs');

const Usuario = sequelize.define('Usuario', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [3, 50]
        }
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    fecha_registro: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, {
    tableName: 'usuarios',
    timestamps: false,
    hooks: {
        beforeCreate: async (usuario) => {
            usuario.password = await bcrypt.hash(usuario.password, 10);
        }
    }
});

// Método para verificar contraseña
Usuario.prototype.validarPassword = async function(password) {
    return await bcrypt.compare(password, this.password);
};

module.exports = Usuario;