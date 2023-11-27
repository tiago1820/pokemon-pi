import { CLEAN_DETAIL, GET_ALL_POKEMONS, GET_POKEMON_DETAIL, ORDER } from "./action-types";

const initialState = {
    allPokemons: [],
    pokemonDetail: [],
}

const rootReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case GET_ALL_POKEMONS:
            return {
                ...state, allPokemons: payload
            };

        case GET_POKEMON_DETAIL:
            return {
                ...state,
                pokemonDetail: payload
            }

        case CLEAN_DETAIL:
            return {
                ...state,
                pokemonDetail: {},
            };

        case ORDER:
            let copy = [...state.allPokemons].sort((a, b) => {
                if (payload === 'A') {
                    return a.name.localeCompare(b.name);
                } else if (payload === 'D') {
                    return b.name.localeCompare(a.name);
                } else if (payload === 'hight') {
                    return b.attack - a.attack;
                } else if (payload === 'low') {
                    return a.attack - b.attack
                } else {
                    return 0;
                }
            });

            return {
                ...state,
                allPokemons: copy,
            }

        default:
            return {
                ...state
            };
    }
}

export default rootReducer;