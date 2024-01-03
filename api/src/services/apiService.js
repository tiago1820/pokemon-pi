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
            const response = await axios(`${this.URL_POKEMONS}/?limit=${limite}`);
            const results = response.data.results;

            const pokemonList = [];

            for (const pokemon of results) {
                const responsePokemon = await axios(pokemon.url);
                const infoFromApi = responsePokemon.data;

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

                pokemonList.push(infoPokemon);
            }

            return pokemonList;
        } catch (error) {
            throw error;
        }
    }

    getPokemonByName = async (name) => {
        try {

            if (!name) {
                return null;
            }
            const response = await axios(`${this.URL_POKEMONS}/${name}`);

            if (response.data) {
                const infoFromApi = response.data;

                const pokemonInfo = {
                    id: infoFromApi.id,
                    name: infoFromApi.name,
                    types: (infoFromApi.types && infoFromApi.types.length > 0) ? infoFromApi.types.map((t) => t.type.name) : [],
                    img: infoFromApi.sprites && infoFromApi.sprites.other && infoFromApi.sprites.other['official-artwork'] ? infoFromApi.sprites.other['official-artwork'].front_default : null,
                    hp: infoFromApi.stats[0]?.base_stat,
                    attack: infoFromApi.stats[1]?.base_stat,
                    defense: infoFromApi.stats[2]?.base_stat,
                    speed: infoFromApi.stats[5]?.base_stat,
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