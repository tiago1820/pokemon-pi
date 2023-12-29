import axios from 'axios';

import {
    CLEAN_DETAIL,
    GET_ALL_POKEMONS,
    GET_POKEMON_DETAIL,
    ORDER, GET_ALL_TYPES,
    FILTER,
    ORIGIN,
    CLEAN_FILTERS,
    DELETE_POKEMON,
    CLEAN_APP,
    LOADING,
    RELOAD,
    REQUEST_ERROR,
    SEARCH_RESULT
} from "./action-types";

const IP = process.env.REACT_APP_IP;



export const setRequestError = (message) => {
    return {
        type: REQUEST_ERROR,
        payload: message
    }
}

export const setReload = (boolean) => {
    return {
        type: RELOAD,
        payload: boolean,
    };
}

export const setLoading = (boolean) => {
    return {
        type: LOADING,
        payload: boolean,
    };
}

export const getPokemonByName = (name) => {
    const formattedName = name.toLowerCase().replace(/\s/g, '');

    const endpoint = `${IP}/pokemons/name?name=${formattedName}`;
    return async (dispatch) => {
        try {
            if (!formattedName.trim()) {
                window.alert('¡Por favor, ingresa un nombre de Pokémon!');
                return;
            }

            const { data } = await axios.get(endpoint);
            
            return dispatch({
                type: SEARCH_RESULT,
                payload: data,
            });
        } catch (error) {
            window.alert(error.response.data);
        }
    }

}

export const getAllPokemons = () => {
    const endpoint = `${IP}/pokemons`;
    return async (dispatch) => {
        try {
            const { data } = await axios.get(endpoint);
            return dispatch({
                type: GET_ALL_POKEMONS,
                payload: data,
            });
        } catch (error) {
            window.alert(error.response.data);
        }
    }
}

export const getAllTypes = () => {
    const endpoint = `${IP}/types`;
    return async (dispatch) => {
        try {
            const { data } = await axios.get(endpoint);
            return dispatch({
                type: GET_ALL_TYPES,
                payload: data,
            });
        } catch (error) {
            window.alert(error.response.data);
        }
    }
}

export const removePokemon = (id) => {
    const endpoint = `${IP}/pokemons/${id}`;
    return async (dispatch) => {
        try {
            await axios.delete(endpoint);

            return dispatch({
                type: DELETE_POKEMON,
                payload: id,
            });
        } catch (error) {
            window.alert(error.response.data);
        }
    }
}

export const getPokemonDetail = id => {
    const endpoint = `${IP}/pokemons/${id}`;
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

export const cleanApp = () => {
    return { type: CLEAN_APP };
}

export const cleanFilters = () => {
    return { type: CLEAN_FILTERS };
}


export const orderCards = order => {
    return {
        type: ORDER,
        payload: order,
    };
};

export const filterCards = (type, origin) => {
    return {
        type: FILTER,
        payload: { type, origin },
    };
};

export const filterOrigin = origin => {
    return {
        type: ORIGIN,
        payload: origin,
    };
};