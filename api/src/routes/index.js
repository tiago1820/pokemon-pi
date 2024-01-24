const { Router } = require('express');
const router = Router();

const PokemonController = require('../controllers/pokemonController');
const pokeController = new PokemonController()

router.get('/pokemons/name', (req, res) => pokeController.getPokemonByName(req, res));
/**
 * @swagger
 * /pokemons/name:
 *   get:
 *     summary: Obtener un pokemon por nombre
 *     tags:
 *       - Pokemons
 *     parameters:
 *       - in: query
 *         name: name
 *         required: true
 *         description: Nombre del pokemon que deseas obtener
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Un objeto con todos los datos del pokemon.
 *       404:
 *         description: Pokemon no encontrado.
 *       400:
 *         description: Falta el nombre del pokemon.
 *       500:
 *         description: Error interno del servidor.
 */

router.get('/pokemons/:id', (req, res) => pokeController.getPokemonById(req, res));
/**
 * @swagger
 * /pokemons/{id}:
 *   get:
 *     summary: Obtener un pokemon por nombre
 *     tags:
 *       - Pokemons
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Name del pokemon que deseas obtener
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: Un objeto con todos los datos del pokemon.
 *       404:
 *         description: Pokemon no encontrado.
 *       400:
 *         description: Falta el nombre del pokemon.
 *       500:
 *         description: Error interno del servidor.
 */

router.get('/pokemons', (req, res) => pokeController.getAllPokemons(req, res));
/**
 * @swagger
 * /pokemons:
 *   get:
 *     summary: Obtener todos los pokemons
 *     tags:
 *       - Pokemons
 *     responses:
 *       200:
 *         description: Lista de todos los pokemons.
 *       500:
 *         description: Error interno del servidor.
 */

router.post('/pokemons', (req, res) => pokeController.postPokemon(req, res));
router.put('/pokemons/:id', (req, res) => pokeController.updatePokemon(req, res));
router.delete('/pokemons/:id', (req, res) => pokeController.removePokemonById(req, res));
router.get('/types', (req, res) => pokeController.getAllTypes(req, res));
router.post('/types', (req, res) => pokeController.postType(req, res));

module.exports = router;
