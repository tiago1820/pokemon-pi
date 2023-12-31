import axios from 'axios';
import { useDispatch } from 'react-redux';

export class Service {
    constructor() {
        this.IP = process.env.REACT_APP_IP;
    }

    dispatch = useDispatch();

    async createPokemon(pokeData) {
        try {
            const { name, hp, attack, defense, speed, weight, height, types } = pokeData;
            const URL = `${this.IP}/pokemons`;

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
            const URL = `${this.IP}/pokemons/${id}`;

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
