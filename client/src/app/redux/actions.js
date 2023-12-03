import axios from 'axios';

import { CLEAN_DETAIL, GET_ALL_POKEMONS, GET_POKEMON_DETAIL, ORDER, GET_ALL_TYPES, FILTER, ORIGIN } from "./action-types";
const IP = process.env.REACT_APP_IP;


export const getAllPokemons = () => {
    const endpoint = `${IP}:3001/pokemons`;
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

export const getAllTypes = () => {
    const endpoint = `${IP}:3001/types`;
    return async (dispatch) => {
        try {
            const { data } = await axios.get(endpoint);
            return dispatch({
                type: GET_ALL_TYPES,
                payload: data,
            });
        } catch (error) {
            throw error;
        }
    }
}

export const getPokemonDetail = id => {
    const endpoint = `${IP}:3001/pokemons/${id}`;
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

export const filterCards = filter => {
    return {
        type: FILTER,
        payload: filter,
    };
};

export const filterOrigin = origin => {
    return {
        type: ORIGIN,
        payload: origin,
    };
};