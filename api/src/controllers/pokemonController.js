const { Pokemon, Type } = require('../db.js');
const PokemonService = require('../services/pokemonService');
const TypeController = require('./typeController');

class PokemonController {
    constructor() {
        this.pokeService = new PokemonService('https://pokeapi.co/api/v2/pokemon/');
        this.typeController = new TypeController();
    }

    updatePokemon = async (req, res) => {
        try {
            const { id } = req.params;

            const { name, types, hp, attack, defense, speed, height, weight, img } = req.body;
            const lowercaseName = name.toLowerCase();

            const updatedPokemon = await Pokemon.findByPk(id);

            if (!updatedPokemon) {
                return res.status(404).send('Pokemon not found.');
            }

            await this.updatePokemonData(updatedPokemon, { name: lowercaseName, types, hp, attack, defense, speed, height, weight, img });
            await this.typeController.updatePokemonTypes(updatedPokemon, types);

            return res.status(200).json(updatedPokemon);
        } catch (error) {
            console.error(error);
            return res.status(500).send(error.message);
        }
    }

    async updatePokemonData(pokemon, data) {
        pokemon.name = data.name;
        pokemon.types = data.types;
        pokemon.image = data.img;
        pokemon.hp = data.hp;
        pokemon.attack = data.attack;
        pokemon.defense = data.defense;
        pokemon.speed = data.speed;
        pokemon.height = data.height;
        pokemon.weight = data.weight;

        await pokemon.save();
    }

    getAllPokemons = async (req, res) => {
        try {
            const pokemonExternos = await this.pokeService.getAllPokemons(10);
            const pokemonDB = await this.pokeService.getAllPokemonFromDB();

            return res.json([...pokemonExternos, ...pokemonDB]);
        } catch (error) {
            console.error(error);
            return res.status(500).send('Internal Server Error');
        }
    }

    getPokemonById = async (req, res) => {
        try {
            const { id } = req.params;
            const source = isNaN(id) ? 'bdd' : 'api';
            const pokemon = await this.pokeService.getPokemonById(id, source);

            return pokemon.name
                ? res.json(pokemon)
                : res.status(404).send('Pokemon not found.');
        } catch (error) {
            return res.status(500).send(error.message);
        }
    }

    removePokemonById = async (req, res) => {
        try {
            const { id } = req.params;
            console.log('Intentando eliminar el Pokémon con ID:', id);


            const pokemonToDelete = await Pokemon.findByPk(id);
            if (!pokemonToDelete) {
                return res.status(404).send('Pokemon not found.');
            }

            console.log('Pokemon encontrado:', pokemonToDelete);

            await Pokemon.destroy({
                where: {
                    id: id
                }
            });

            return res.status(200).send('Pokemon successfully removed.');
        } catch (error) {
            console.error(error);
            return res.status(500).send('Internal Server Error');
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

            const lowercaseName = name.toLowerCase();

            const newPokemon = await Pokemon.create({
                name: lowercaseName,
                types,
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