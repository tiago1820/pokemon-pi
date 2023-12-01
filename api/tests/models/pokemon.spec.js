const { Pokemon, conn } = require('../../src/db.js');
const { expect } = require('chai');

describe('Pokemon model', () => {
    before(() => conn.authenticate()
        .catch((err) => {
            console.error('No se pudo conectar a la base de datos:', err);
        }));
    describe('Validadores', () => {
        beforeEach(() => Pokemon.sync({ force: false }));
        describe('name', () => {
            it('debería lanzar un error si el nombre es nulo', (done) => {
                Pokemon.create({})
                    .then(() => done(new Error('Se requiere un nombre válido')))
                    .catch(() => done());
            });
            it('debería funcionar cuando es un nombre válido', () => {
                Pokemon.create({ name: 'Pikachu' });
            });
        });

        describe('hp', () => {
            it('debería lanzar un error si hp es nulo', (done) => {
                Pokemon.create({})
                    .then(() => done(new Error('Se requiere un hp válido')))
                    .catch(() => done());
            });

            it('debería funcionar cuando hp es un número válido', () => {
                Pokemon.create({ name: 'Pikachu', hp: 50 });
            });
        });

        describe('attack', () => {
            it('debería lanzar un error si attack es nulo', (done) => {
                Pokemon.create({})
                    .then(() => done(new Error('Se requiere un ataque válido')))
                    .catch(() => done());
            });

            it('debería funcionar cuando attack es un número válido', () => {
                Pokemon.create({ name: 'Pikachu', attack: 40 });
            });
        });

        describe('defense', () => {
            it('debería lanzar un error si defense es nulo', (done) => {
                Pokemon.create({})
                    .then(() => done(new Error('Se requiere una defensa válida')))
                    .catch(() => done());
            });

            it('debería funcionar cuando defense es un número válido', () => {
                Pokemon.create({ name: 'Pikachu', defense: 30 });
            });
        });

        describe('speed', () => {
            it('debería lanzar un error si speed es nulo', (done) => {
                Pokemon.create({})
                    .then(() => done(new Error('Se requiere una velocidad válida')))
                    .catch(() => done());
            });

            it('debería funcionar cuando speed es un número válido', () => {
                Pokemon.create({ name: 'Pikachu', speed: 60 });
            });
        });

        describe('height', () => {
            it('debería lanzar un error si height es nulo', (done) => {
                Pokemon.create({})
                    .then(() => done(new Error('Se requiere una altura válida')))
                    .catch(() => done());
            });

            it('debería funcionar cuando height es un número válido', () => {
                Pokemon.create({ name: 'Pikachu', height: 1 });
            });
        });

        describe('weight', () => {
            it('debería lanzar un error si weight es nulo', (done) => {
                Pokemon.create({})
                    .then(() => done(new Error('Se requiere un peso válido')))
                    .catch(() => done());
            });

            it('debería funcionar cuando weight es un número válido', () => {
                Pokemon.create({ name: 'Pikachu', weight: 6 });
            });
        });

        describe('created', () => {
            it('debería lanzar un error si created es nulo', (done) => {
                Pokemon.create({})
                    .then(() => done(new Error('Se requiere un valor de creación válido')))
                    .catch(() => done());
            });

            it('debería funcionar cuando created es un booleano válido', () => {
                Pokemon.create({ name: 'Pikachu', created: true });
            });
        });
    });
});
