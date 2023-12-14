const { Router } = require('express');
const router = Router();

const PokemonController = require('../controllers/pokemonController');

const pokeController = new PokemonController()

router.get('/pokemons/name', (req, res) => pokeController.getPokemonByName(req, res));
router.get('/pokemons', (req, res) => pokeController.getAllPokemons(req, res));
router.get('/pokemons/:id', (req, res) => pokeController.getPokemonById(req, res));
router.post('/pokemons', (req, res) => pokeController.postPokemon(req, res));
router.delete('/pokemons/:id', (req, res) => pokeController.removePokemonById(req, res));
router.put('/pokemons/:id', (req, res) => pokeController.updatePokemon(req, res));

router.get('/types', (req, res) => pokeController.getAllTypes(req, res));
// router.get('/types/load', (req, res) => typeController.loadTypesTable(req, res));

module.exports = router;