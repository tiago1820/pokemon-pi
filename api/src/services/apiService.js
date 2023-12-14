const axios = require('axios');


class ApiService {
    constructor(URL) {
        this.URL = URL;
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

    getPokemonByName = async (name) => {
        try {
            const response = await axios(`${this.URL}/${name}`);

            if (response.data) {
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
            }

        } catch (error) {
            throw error;
        }
    }

}

module.exports = ApiService;