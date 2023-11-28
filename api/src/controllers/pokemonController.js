const { Pokemon, Type } = require('../db.js');
const PokemonService = require('../services/pokemonService');

class PokemonController {
    constructor() {
        this.pokeService = new PokemonService('https://pokeapi.co/api/v2/pokemon/');
    }

    getAllPokemons = async (req, res) => {
        try {
            const pokemonExternos = await this.pokeService.getAllPokemons(5);
            const pokemonDB = await Pokemon.findAll();
            const todosLosPokemons = [...pokemonExternos, ...pokemonDB];

            return res.json(todosLosPokemons);
        } catch (error) {
            return res.status(500).send(error.message);
        }
    }

    getPokemonById = async (req, res) => {
        try {
            const { id } = req.params;
            const source = isNaN(id) ? 'bdd' : 'api';
            const pokemon = await this.pokeService.getPokemonById(id, source);

            console.log("AQUI", pokemon);

            return pokemon.name
                ? res.json(pokemon)
                : res.status(404).send('Pokemon not found.');
        } catch (error) {
            return res.status(500).send(error.message);
        }
    }

    getPokemonByName = async (req, res) => {
        try {
            const { name } = req.query;

            if (!name) {
                return res.status(400).send('Pokemon name is required.');
            }

            const pokemon = await this.pokeService.getPokemonByName(name);

            return pokemon.name
                ? res.json(pokemon)
                : res.status(404).send('Pokemon not found.');
        } catch (error) {
            return res.status(500).send(error.message);
        }
    }

    postPokemon = async (req, res) => {
        try {
            const {
                name,
                types,
                hp,
                attack,
                defense,
                speed,
                height,
                weight,
                img,
                created
            } = req.body;

            const newPokemon = await Pokemon.create({
                name,
                image: img,
                hp,
                attack,
                defense,
                speed,
                height,
                weight,
                created,
            });

            const typeInstances = [];
            for (const typeName of types) {
                const [type, created] = await Type.findOrCreate({
                    where: { name: typeName },
                    defaults: { name: typeName },
                });
                typeInstances.push(type);
            }

            await newPokemon.setTypes(typeInstances);

            return res.status(201).json(newPokemon);

        } catch (error) {
            console.error(error);
            return res.status(500).send(error.message);
        }
    }

}

module.exports = PokemonController;