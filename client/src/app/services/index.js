import axios from "axios";

const IP = process.env.REACT_APP_IP;

export const createPokemon = (pokeData) => {
    const { name, hp, attack, defense, speed, weight, height, types } = pokeData;
    const URL = `${IP}/pokemons`;

    return axios
        .post(URL, {
            name,
            hp,
            attack,
            defense,
            speed,
            weight,
            height,
            types,
        })
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            window.alert(error.response.data);
        });
};

export const editPokemon = (pokeData) => {
    const { id, name, hp, attack, defense, speed, weight, height, types } = pokeData;
    const URL = `${IP}/pokemons/${id}`;

    return axios
        .put(URL, {
            name,
            hp,
            attack,
            defense,
            speed,
            weight,
            height,
            types,
        })
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            window.alert(error.response.data);
        });
};
