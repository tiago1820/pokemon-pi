import axios from 'axios';
import { useDispatch } from 'react-redux';

export class Service {
    constructor() {
        this.IP = process.env.REACT_APP_IP;
    }

    dispatch = useDispatch();

    async onSearch(name, pokemons, setPokemons) {
        try {
            if (!name.trim()) {
                window.alert('¡Por favor, ingresa un nombre de Pokémon!');
                return;
            }

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
            window.alert(error.response.data);
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
            window.alert(error.response.data);
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

            return response.data;
        } catch (error) {
            window.alert(error.response.data);
        }
    }
}
