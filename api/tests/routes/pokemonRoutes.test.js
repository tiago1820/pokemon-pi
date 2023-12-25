const request = require('supertest');
const express = require('express');
const routes = require('../../src/routes/index');

const app = express();
app.use(routes);

describe('Test de rutas de Pokémon', () => {
  it('Debería obtener todos los Pokémon', async () => {
    const response = await request(app).get('/pokemons');
    expect(response.statusCode).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
    expect(response.body.length).toBeGreaterThan(0);

  });

  it('Debería obtener un Pokémon por ID', async () => {
    const response = await request(app).get('/pokemons/1');
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('id', 1);
    expect(response.body).toHaveProperty('name', 'bulbasaur');
  });

});
