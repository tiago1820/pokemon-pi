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
            const externalPokemons = await this.apiService.getAllPokemons(50);
            const pokemonDB = await this.dbService.getAllPokemons();

            return res.json([...externalPokemons, ...pokemonDB]);
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

    getPokemonByName(req, res) {
        const { name } = req.query;
        let message = "";

        if (!name) {
            message = "Falta el nombre del pokemon.";
            res.status(400).send(message);
            return Promise.reject(message);
        }

        return this.apiService.getPokemonByName(name)
            .then(pokemonInfo => {
                if (!pokemonInfo) {
                    return this.dbService.getPokemonByName(name);
                }
                return pokemonInfo;
            })
            .then(pokemonInfo => {
                res.status(200).json(pokemonInfo);
                return Promise.resolve(pokemonInfo);
            })
            .catch(error => {
                message = "¡Pokemon no encontrado!";
                res.status(404).send(message);
                return Promise.reject(message);
            });
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

    postType = async (req, res) => {
        try {
            const newType = await this.dbService.addNewType(req);
            return res.status(200).send("Typo creado con exito.")
        } catch (error) {
            return res.status(500).send("Error al crear un nuevo typo.");
        }
    }

}

module.exports = PokemonController;