/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Pokemon, conn } = require('../../src/db.js');

const agent = session(app);


describe('Pokemon routes', () => {
    before(() => conn.authenticate()
        .catch((err) => {
            console.error('No se pudo conectar a la base de datos:', err);
        }));

    beforeEach(() => Pokemon.sync({ force: true })
        .then(() => Pokemon.create({
            name: 'Pikachu',
            hp: 50,
            attack: 40,
            defense: 30,
            speed: 60,
            height: 1,
            weight: 6,
        })));

    describe('GET /pokemons', () => {
        it('debería obtener un código 200', () =>
            agent.get('/pokemons').expect(200)
        );
    });

    describe('GET /pokemons/name', () => {
        it('debería obtener un código 400 si no se proporciona el nombre', () =>
            agent.get('/pokemons/name').expect(400)
        );

        it('debería obtener un código 200 con un nombre válido', () =>
            agent.get('/pokemons/name?name=Pikachu').expect(200)
        );
    });


});