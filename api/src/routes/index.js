const { Router } = require('express');
const router = Router();

const PokemonController = require('../controllers/pokemonController');
const pokeController = new PokemonController()


// Pokemons
router.get('/pokemons', (req, res) => pokeController.getAllPokemons(req, res))




module.exports = router;
