const PokemonService = require('../services/pokemonService');

class PokemonController {
    constructor() {
        this.pokeService = new PokemonService('https://pokeapi.co/api/v2/pokemon/');
    }

    getAllPokemons = async (req, res) => {
        try {
            const pokemons = await this.pokeService.getAllPokemons();
            return res.json(pokemons);
        } catch (error) {
            return res.status(500).send(error.message);
        }
    }

}

module.exports = PokemonController;