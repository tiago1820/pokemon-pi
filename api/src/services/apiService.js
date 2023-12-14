const axios = require('axios');


class ApiService {
    constructor() {
        this.URL_POKEMONS = 'https://pokeapi.co/api/v2/pokemon/';
        this.URL_TYPES = 'https://pokeapi.co/api/v2/type';
    }

    getTypesFromApi = async () => {
        try {
            const response = await axios(this.URL_TYPES);
            const allTypes = response.data.results;

            return allTypes;

        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    getPokemonById = async (id) => {
        try {
            const response = await axios(`${this.URL_POKEMONS}/${id}`);
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

        } catch (error) {
            throw error;

        }
    }

    getAllPokemons = async (limite) => {
        try {
            const respuesta = await axios(`${this.URL_POKEMONS}/?limit=${limite}`);
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

    getPokemonByName = async (name) => {
        try {
            const response = await axios(`${this.URL_POKEMONS}/${name}`);

            if (response.data) {
                const infoFromApi = response.data;

                const pokemonInfo = {
                    id: infoFromApi.id,
                    name: infoFromApi.name,
                    types: infoFromApi.types ? infoFromApi.types.map((t) => t.type.name) : [],
                    img: infoFromApi.sprites.other['official-artwork'].front_default,
                    hp: infoFromApi.stats[0].base_stat,
                    attack: infoFromApi.stats[1].base_stat,
                    defense: infoFromApi.stats[2].base_stat,
                    speed: infoFromApi.stats[5].base_stat,
                    weight: infoFromApi.weight,
                    height: infoFromApi.height,
                };

                return pokemonInfo;
            }

        } catch (error) {
            throw error;
        }
    }

}

module.exports = ApiService;