const { Pokemon, Type } = require('../db.js');
const ApiService = require('../services/apiService.js');
const TypeController = require('./typeController');
const DataBaseService = require('../services/dataBaseService.js')

class PokemonController {
    constructor() {
        this.typeController = new TypeController();
        this.apiService = new ApiService('https://pokeapi.co/api/v2/pokemon/');
        this.dbService = new DataBaseService();
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
            const pokemonExternos = await this.apiService.getAllPokemons(25);
            const pokemonDB = await this.dbService.getAllPokemons();

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

            if (source === 'api') {
                const pokemonInfo = await this.apiService.getPokemonById(id);
                res.status(200).json(pokemonInfo);
            } else if (source === 'bdd') {
                const pokemonInfo = await this.dbService.getPokemonById(id);
                res.status(200).json(pokemonInfo);
            }

        } catch (error) {
            res.status(404).send("¡Pokemon no encontrado!");
        }
    }

    removePokemonById = async (req, res) => {
        try {
            const { id } = req.params;
            const pokemonToDelete = await this.findPokemonById(id);

            if (!pokemonToDelete) {
                return res.status(404).send('Pokemon not found.');
            }

            await this.deletePokemonById(id);

            return res.status(200).send('Pokemon successfully removed.');
        } catch (error) {
            console.error(error);
            return res.status(500).send('Internal Server Error');
        }
    }

    async findPokemonById(id) {
        return await Pokemon.findByPk(id);
    }

    async deletePokemonById(id) {
        await Pokemon.destroy({
            where: {
                id: id
            }
        });
    }

    getPokemonByName = async (req, res) => {
        try {
            const { name } = req.query;
            this.validateInput(name, res);
            let pokemonInfo = await this.apiService.getPokemonByName(name);

            if (!pokemonInfo) {
                pokemonInfo = await this.dataBaseService.getPokemonByName(name);
            }

            res.status(200).json(pokemonInfo);

        } catch (error) {
            res.status(404).send("¡Pokemon no encontrado!");
        }
    }

    validateInput(name, res) {
        if (!name) {
            res.status(400).send('Pokemon name is required.');
            throw new Error('Invalid input: Pokemon name is required.');
        }
    }

    async getPokemonByNameFromService(name) {
        return await this.pokeService.getPokemonByName(name);
    }

    handlePokemonResponse(pokemon, res) {
        if (pokemon.name) {
            res.json(pokemon);
        } else {
            res.status(404).send('Pokemon not found.');
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
            // console.error(error);
            return res.status(500).send("Error al crear pokemon.");
        }
    }

}

module.exports = PokemonController;