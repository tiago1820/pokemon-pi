const { Router } = require('express');
const router = Router();

const PokemonController = require('../controllers/pokemonController');
const TypeController = require('../controllers/typeController');

const pokeController = new PokemonController()
const typeController = new TypeController();

router.get('/pokemons/name', (req, res) => pokeController.getPokemonByName(req, res));
router.get('/pokemons', (req, res) => pokeController.getAllPokemons(req, res));
router.get('/pokemons/:id', (req, res) => pokeController.getPokemonById(req, res));
router.post('/pokemons', (req, res) => pokeController.postPokemon(req, res));
router.get('/types/load', (req, res) => typeController.loadTypesTable(req, res));

module.exports = router;