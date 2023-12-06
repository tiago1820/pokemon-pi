import axios from 'axios';

export class Service {
    constructor() {
        this.IP = process.env.REACT_APP_IP;
    }

    async onSearch(name, pokemons, setPokemons) {
        try {
            const { data } = await axios(`${this.IP}:3001/pokemons/name?name=${name}`);
            if (data.name) {
                const isDuplicate = pokemons.some(pokemon => pokemon.name === data.name);
                if (isDuplicate) {
                    window.alert('¡No puedes buscar Pokémon repetido!');
                } else {
                    setPokemons(oldPokemons => [...oldPokemons, data]);
                }
            }
        } catch (error) {
            window.alert('¡No hay pokemons con este nombre!');
        }
    }

    async createPokemon(pokeData) {
        try {
            const { name, hp, attack, defense, speed, weight, height, types } = pokeData;
            const URL = `${this.IP}:3001/pokemons`;

            const response = await axios.post(URL, {
                name,
                hp,
                attack,
                defense,
                speed,
                weight,
                height,
                types,
            });

            return response.data;
        } catch (error) {
            console.error('Error al crear el Pokémon:', error);
            throw error;
        }
    }

    async editPokemon(pokeData) {
        try {
            const { id, name, hp, attack, defense, speed, weight, height, types } = pokeData;
            const URL = `${this.IP}:3001/pokemons/${id}`;

            const response = await axios.put(URL, {
                name,
                hp,
                attack,
                defense,
                speed,
                weight,
                height,
                types,
            });

            console.log('Pokemon editado:', response.data);
            return response.data;
        } catch (error) {
            console.error('Error al editar el Pokémon:', error);
            throw error;
        }
    }
}
