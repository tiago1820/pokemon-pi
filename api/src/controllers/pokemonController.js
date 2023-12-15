const ApiService = require('../services/apiService.js');
const DataBaseService = require('../services/dataBaseService.js')

class PokemonController {
    constructor() {
        this.apiService = new ApiService();
        this.dbService = new DataBaseService();
    }

    loadTypesInTable = async (req, res) => {
        try {
            const allTypes = await this.apiService.getTypesFromApi();
            const types = await this.dbService.insertTypesInDB(allTypes);

            return types;
        } catch (error) {
            throw error;
        }
    }

    getAllTypes = async (req, res) => {
        try {
            const allTypes = await this.dbService.getAllTypes();
            return res.status(200).json(allTypes);
        } catch (error) {
            console.log("Types", error);
            return res.status(500).send("Error al obtner los tipos.");
        }
    }

    updatePokemon = async (req, res) => {
        try {
            await this.dbService.updatePokemon(req);
            await this.dbService.updateTypes(req);

            return res.status(200).send("Pokemon actualizado con exito!");
        } catch (error) {
            return res.status(500).send("Error al actualizar el pokemon.");
        }
    }

    getAllPokemons = async (req, res) => {
        try {
            const pokemonExternos = await this.apiService.getAllPokemons(40);
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

            if (!name) {
                res.status(400).send('Falta el nombre del pokemon.');
            }

            let pokemonInfo = await this.apiService.getPokemonByName(name);

            if (!pokemonInfo) {
                pokemonInfo = await this.dbService.getPokemonByName(name);
            }

            res.status(200).json(pokemonInfo);

        } catch (error) {
            console.log(error);
            res.status(404).send("¡Pokemon no encontrado!");
        }
    }

    postPokemon = async (req, res) => {
        try {
            const newPokemon = await this.dbService.postPokemon(req);
            await this.dbService.postType(req, newPokemon);
            return res.status(200).send("Pokemon creado con exito.");

        } catch (error) {
            return res.status(500).send("Error al crear pokemon.");
        }
    }

}

module.exports = PokemonController;