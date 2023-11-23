// const Pokemon = require('../models/Pokemon');
// const Type = require('../models/Type');

const { Pokemon, Type } = require('../db.js');



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

    getPokemonById = async (req, res) => {
        try {
            const { id } = req.params;
            const pokemon = await this.pokeService.getPokemonById(id);

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