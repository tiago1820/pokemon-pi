const axios = require('axios');
const { Pokemon, Type } = require('../db.js');

class PokemonService {
    constructor(URL) {
        this.URL = URL;
    }

    getAllPokemons = async (limite) => {
        try {
            const respuesta = await axios(`${this.URL}/?limit=${limite}`);
            const resultados = respuesta.data.results;

            const listaDePokemon = [];

            for (const pokemon of resultados) {
                const respuestaPokemon = await axios(pokemon.url);
                const infoFromApi = respuestaPokemon.data;

                const infoPokemon = {
                    id: infoFromApi.id,
                    name: infoFromApi.name,
                    types: infoFromApi.types.map((t) => t.type.name),
                    img: infoFromApi.sprites.other['official-artwork'].front_default,
                    hp: infoFromApi.stats[0].base_stat,
                    attack: infoFromApi.stats[1].base_stat,
                    defense: infoFromApi.stats[2].base_stat,
                    speed: infoFromApi.stats[5].base_stat,
                    weight: infoFromApi.weight,
                    height: infoFromApi.height,
                };

                listaDePokemon.push(infoPokemon);
            }

            return listaDePokemon;
        } catch (error) {
            throw error;
        }
    }

    getAllPokemonFromDB = async () => {
        try {
            const pokemonDB = await Pokemon.findAll({
                include: [{ model: Type, through: 'pokemon_type' }],
            });

            const formattedData = pokemonDB.map(pokemon => ({
                id: pokemon.id,
                name: pokemon.name,
                types: pokemon.types ? pokemon.types.map(typeArr => typeArr.name) : [],
                img: pokemon.img,
                hp: pokemon.hp,
                attack: pokemon.attack,
                defense: pokemon.defense,
                speed: pokemon.speed,
                weight: pokemon.weight,
                height: pokemon.height,
                created: pokemon.created
            }));

            return formattedData;
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
                    hp: infoFromApi.stats[0].base_stat,
                    attack: infoFromApi.stats[1].base_stat,
                    defense: infoFromApi.stats[2].base_stat,
                    speed: infoFromApi.stats[5].base_stat,
                    weight: infoFromApi.weight,
                    height: infoFromApi.height,
                };

                return pokemonInfo;
            } else {
                const pokemonFromDB = await this.getFromDataBaseById(id);

                const formattedPokemon = {
                    id: pokemonFromDB.id,
                    name: pokemonFromDB.name,
                    types: pokemonFromDB.types ? pokemonFromDB.types.map(typeArr => typeArr.name) : [],
                    img: pokemonFromDB.img,
                    hp: pokemonFromDB.hp,
                    attack: pokemonFromDB.attack,
                    defense: pokemonFromDB.defense,
                    speed: pokemonFromDB.speed,
                    weight: pokemonFromDB.weight,
                    height: pokemonFromDB.height,
                    created: pokemonFromDB.created,
                };



                return formattedPokemon;
            }
        } catch (error) {
            console.error("Error en getPokemonById:", error);
            throw error;
        }
    }

    getFromDataBaseById = async (id) => {
        try {
            const pokemonFromDB = await Pokemon.findByPk(id, {
                include: [{ model: Type, through: 'pokemon_type' }],
            });

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
                hp: infoFromApi.hp,
                attack: infoFromApi.attack,
                defense: infoFromApi.defense,
                speed: infoFromApi.speed,
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