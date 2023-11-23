const { Router } = require('express');
const router = Router();

const PokemonController = require('../controllers/pokemonController');
const pokeController = new PokemonController()


// Pokemons
router.get('/pokemons', (req, res) => pokeController.getAllPokemons(req, res));
router.get('/pokemons/:id', (req, res) => pokeController.getPokemonById(req, res));
router.get('/pokemons/:name', (req, res) => pokeController.getPokemonByName(req, res));
router.post('/pokemons/', (req, res) => pokeController.postPokemon(req, res));



module.exports = router;
