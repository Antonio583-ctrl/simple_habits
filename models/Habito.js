const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const Usuario = require('./Usuario');

const Habito = sequelize.define('Habito', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    usuario_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Usuario,
            key: 'id'
        }
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            len: [3, 100]
        }
    },
    descripcion: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    racha_actual: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    racha_maxima: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    ultimo_check: {
        type: DataTypes.DATEONLY,
        allowNull: true
    },
    activo: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
}, {
    tableName: 'habitos',
    timestamps: true
});

// Relación
Usuario.hasMany(Habito, { foreignKey: 'usuario_id' });
Habito.belongsTo(Usuario, { foreignKey: 'usuario_id' });

module.exports = Habito;