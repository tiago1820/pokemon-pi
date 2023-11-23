const axios = require('axios');
const { Pokemon, Type } = require('../db.js');

class PokemonService {
    constructor(URL) {
        this.URL = URL;
    }

    getAllPokemons = async () => {

        try {
            const response = await axios(`${this.URL}/?limit=10`);
            const results = response.data.results;

            const pokemonList = [];

            for (const pokemon of results) {
                const pokemonResponse = await axios(pokemon.url);
                const infoFromApi = pokemonResponse.data;

                const pokemonInfo = {
                    id: infoFromApi.id,
                    name: infoFromApi.name,
                    types: infoFromApi.types.map((t) => t.type.name),
                    img: infoFromApi.sprites.other['official-artwork'].front_default,
                    weight: infoFromApi.weight,
                    height: infoFromApi.height,
                };

                pokemonList.push(pokemonInfo);
            }


            return pokemonList;

        } catch (error) {
            throw error;
        }
    }

    getPokemonById = async (id, source) => {
        try {
            if (source === 'api') {
                const response = await axios(`${this.URL}/${id}`);
                const infoFromApi = response.data;

                const pokemonInfo = {
                    id: infoFromApi.id,
                    name: infoFromApi.name,
                    types: infoFromApi.types.map((t) => t.type.name),
                    img: infoFromApi.sprites.other['official-artwork'].front_default,
                    weight: infoFromApi.weight,
                    height: infoFromApi.height,
                };

                return pokemonInfo;
            } else {
                const pokemonFromDB = await this.getFromDataBaseById(id);
                return pokemonFromDB;
            }

        } catch (error) {
            throw error;
        }
    }

    getFromDataBaseById = async (id) => {
        try {
            const pokemonFromDB = await Pokemon.findByPk(id);

            if (!pokemonFromDB) {
                throw new Error('Pokemon not found in the database');
            }

            return pokemonFromDB;
        } catch (error) {
            throw error;
        }
    }

    getPokemonByName = async (name) => {
        try {

            const apiResponse = await axios(`${this.URL}/${name}`);
            const infoFromApi = apiResponse.data;

            const pokemonInfo = {
                id: infoFromApi.id,
                name: infoFromApi.name,
                types: infoFromApi.types.map((t) => t.type.name),
                img: infoFromApi.sprites.other['official-artwork'].front_default,
                weight: infoFromApi.weight,
                height: infoFromApi.height,
            };

            return pokemonInfo;

        } catch (apiError) {
            try {
                const pokemonFromDB = await this.getFromDataBaseByName(name);
                return pokemonFromDB;
            } catch (error) {
                throw new Error('Pokemon not found');
            }
        }
    }

    getFromDataBaseByName = async (name) => {
        try {
            const pokemonFromDB = await Pokemon.findOne({
                where: { name: name },
            });

            if (!pokemonFromDB) {
                throw new Error('Pokemon not found in the database');
            }

            return pokemonFromDB;
        } catch (error) {
            throw error;
        }
    }

}

module.exports = PokemonService;