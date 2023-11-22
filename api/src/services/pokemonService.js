const axios = require('axios');

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

    getPokemonById = async (id) => {
        try {
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

        } catch (error) {
            throw error;
        }
    }

    getPokemonByName = async (name) => {
        try {
            
            const response = await axios(`${this.URL}${name}`);
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

        } catch (error) {
            throw error;
        }
    }
}

module.exports = PokemonService;