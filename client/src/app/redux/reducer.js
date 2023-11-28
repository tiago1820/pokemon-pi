import { CLEAN_DETAIL, GET_ALL_POKEMONS, GET_POKEMON_DETAIL, ORDER, GET_ALL_TYPES, FILTER } from "./action-types";

const initialState = {
    allPokemons: [],
    allTypes: [],
    pokemonDetail: [],
    alteredList: [],
}

const rootReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case GET_ALL_POKEMONS:
            return {
                ...state, allPokemons: payload, alteredList: payload,
            };

        case GET_ALL_TYPES:
            return {
                ...state, allTypes: payload
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
                alteredList: copy,
            }

        case FILTER:
            if (payload === 'all') {
                return {
                    ...state,
                    alteredList: state.allPokemons,
                };
            } else {
                const filteredList = state.allPokemons.filter(pokemon =>
                    pokemon.types && pokemon.types.includes(payload)
                );
                

                return {
                    ...state,
                    alteredList: filteredList,
                };
            }



        default:
            return {
                ...state
            };
    }
}

export default rootReducer;