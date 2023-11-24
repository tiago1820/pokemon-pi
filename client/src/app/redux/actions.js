import axios from 'axios';


import { GET_ALL_POKEMONS } from "./action-types";

export const getAllPokemons = () => {
    const endpoint = 'http://localhost:3001/pokemons';
    return async (dispatch) => {
        try {
            const { data } = await axios.get(endpoint);
            return dispatch({
                type: GET_ALL_POKEMONS,
                payload: data,
            });
        } catch (error) {
            throw error;
        }
    }
}

