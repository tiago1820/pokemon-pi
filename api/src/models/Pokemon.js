const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
    // defino el modelo
    sequelize.define('pokemon', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true
        },

        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        image: {
            type: DataTypes.STRING,
            allowNull: true,
        },

        hp: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },

        attack: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },

        defense: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },

        speed: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },

        height: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        weight: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        created: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
            allowNull: false,
        },
    }, { timestamps: false });
};
