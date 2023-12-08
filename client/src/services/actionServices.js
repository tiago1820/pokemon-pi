import axios from 'axios';

import {
    CLEAN_DETAIL,
    GET_ALL_POKEMONS,
    GET_POKEMON_DETAIL,
    ORDER,
    GET_ALL_TYPES,
    FILTER,
    ORIGIN,
    CLEAN_FILTERS,
    DELETE_POKEMON,
    CLEAN_APP,
} from "../app/redux/action-types";

const IP = process.env.REACT_APP_IP;

export class ActionServices {
    constructor() {
        this.IP = process.env.REACT_APP_IP;
    }

    async getAllPokemons() {
        const endpoint = `${this.IP}:3001/pokemons`;
        try {
            const { data } = await axios.get(endpoint);
            return {
                type: GET_ALL_POKEMONS,
                payload: data,
            };
        } catch (error) {
            throw error;
        }
    }

    async getAllPokemons() {
        const endpoint = `${this.IP}:3001/pokemons`;
        try {
            const { data } = await axios.get(endpoint);
            return {
                type: GET_ALL_POKEMONS,
                payload: data,
            };
        } catch (error) {
            throw error;
        }
    }

    async getAllTypes() {
        const endpoint = `${this.IP}:3001/types`;
        try {
            const { data } = await axios.get(endpoint);
            return {
                type: GET_ALL_TYPES,
                payload: data,
            };
        } catch (error) {
            throw error;
        }
    }

    async removePokemon(id) {
        const endpoint = `${this.IP}:3001/pokemons/${id}`;
        try {
            await axios.delete(endpoint);
            return {
                type: DELETE_POKEMON,
                payload: id,
            };
        } catch (error) {
            throw error;
        }
    }

    async getPokemonDetail(id) {
        const endpoint = `${this.IP}:3001/pokemons/${id}`;
        try {
            const { data } = await axios.get(endpoint);
            return {
                type: GET_POKEMON_DETAIL,
                payload: data,
            };
        } catch (error) {
            throw error;
        }
    }

    cleanDetail() {
        return { type: CLEAN_DETAIL };
    }

    cleanApp() {
        return { type: CLEAN_APP };
    }

    cleanFilters() {
        return { type: CLEAN_FILTERS };
    }

    orderCards(order) {
        return {
            type: ORDER,
            payload: order,
        };
    }

    filterCards(type, origin) {
        return {
            type: FILTER,
            payload: { type, origin },
        };
    }

    filterOrigin(origin) {
        return {
            type: ORIGIN,
            payload: origin,
        };
    }
}