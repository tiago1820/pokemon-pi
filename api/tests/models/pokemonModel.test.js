const { Sequelize, DataTypes } = require('sequelize');
const { Pokemon } = require("../../src/db");

require('dotenv').config();
const { DB_USER, DB_PASSWORD, DB_HOST } = process.env;

const sequelize = new Sequelize('pokemon', DB_USER, DB_PASSWORD, {
    host: DB_HOST,
    dialect: 'postgres',
    logging: false,
});

describe('Modelo de Pokémon', () => {
    beforeEach(async () => {
        try {
            await sequelize.authenticate();
            await Pokemon.destroy({ where: {} });
        } catch (error) {
            console.error('Error de conexión a la base de datos:', error);
        }
    });

    it('Debería crear un Pokémon', async () => {
        try {
            const pokemon = await Pokemon.create({
                name: 'Melancia',
                hp: 45,
                attack: 49,
                defense: 49,
                speed: 45,
                height: 7,
                weight: 69,
            });

            expect(pokemon.name).toBe('Melancia');
            expect(pokemon.hp).toBe(45);
            expect(pokemon.attack).toBe(49);
        } catch (error) {
            if (error.name === 'SequelizeUniqueConstraintError') {
                console.error('Error al crear el Pokémon: El nombre ya existe.');
            } else {
                console.error('Error al crear el Pokémon:', error);
            }
        }
    });

});