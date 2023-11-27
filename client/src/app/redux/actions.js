import axios from 'axios';

import { CLEAN_DETAIL, GET_ALL_POKEMONS, GET_POKEMON_DETAIL, ORDER } from "./action-types";

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

export const getPokemonDetail = id => {
    const endpoint = `http://localhost:3001/pokemons/${id}`;
    return async (dispatch) => {
        try {
            const { data } = await axios.get(endpoint);
            return dispatch({
                type: GET_POKEMON_DETAIL,
                payload: data,
            });
        } catch (error) {
            throw error;
        }
    }
}

export const cleanDetail = () => {
    return { type: CLEAN_DETAIL };
}

export const orderCards = order => {
    return { 
        type: ORDER,
        payload: order,
    };
};