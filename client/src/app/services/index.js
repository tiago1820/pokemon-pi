import axios from "axios";

const IP = process.env.REACT_APP_IP;

export const createPokemon = async (pokeData) => {
    try {
        const { name, hp, attack, defense, speed, weight, height, types } = pokeData;
        const URL = `${IP}/pokemons`;

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
};

export const editPokemon = async (pokeData) => {
    try {
        const { id, name, hp, attack, defense, speed, weight, height, types } = pokeData;
        const URL = `${IP}/pokemons/${id}`;

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
};
