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
            await this.dbService.updatePokemon(req);
            await this.dbService.updateTypes(req);

            return res.status(200).json("Pokemon actualizado con exito!");
        } catch (error) {
            console.log(error);
            return res.status(500).send("Error al actualizar el pokemon.");
        }
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
            const pokemonToDelete = await this.dbService.getPokemonById(id);

            if (!pokemonToDelete) {
                return res.status(404).send('Pokemon no encontrado.');
            }

            const deletionResult = await this.dbService.deletePokemonById(id);

            if (deletionResult) {
                return res.status(200).send('Pokemon elimindado con exito.');
            }
        } catch (error) {
            return res.status(500).send('Error al eliminar pokemon.');
        }
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
            return res.status(500).send("Error al crear pokemon.");
        }
    }

}

module.exports = PokemonController;