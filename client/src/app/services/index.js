import axios from "axios";
import { checkDuplicate } from "../utils";

const IP = process.env.REACT_APP_IP;

export const createPokemon = (pokeData, allPokemons) => {
    const { name, hp, attack, defense, speed, weight, height, types } = pokeData;
    if (!checkDuplicate(name, allPokemons)) {
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
    } else {
        window.alert('Ya existe un Pokémon con este nombre.');
        return;
    }
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
