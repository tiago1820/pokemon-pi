import {
    CLEAN_DETAIL,
    GET_ALL_POKEMONS,
    GET_POKEMON_DETAIL,
    ORDER,
    GET_ALL_TYPES,
    FILTER,
    CLEAN_FILTERS,
    DELETE_POKEMON,
    CLEAN_APP,
    LOADING,
    RELOAD,
    REQUEST_ERROR
} from "./action-types";

const initialState = {
    allPokemons: [],
    allTypes: [],
    pokemonDetail: [],
    alteredList: [],
    loading: true,
    reload: false,
    requestError: "",

}

const rootReducer = (state = initialState, { type, payload }) => {
    switch (type) {

        case REQUEST_ERROR:
            return {
                ...state, requestError: payload
            }
        case RELOAD:
            return {
                ...state, reload: payload
            }
        case LOADING:
            return {
                ...state, loading: payload
            }
        case DELETE_POKEMON:
            return {
                ...state, allPokemons: payload
            };
        case GET_ALL_POKEMONS:
            return {
                ...state, allPokemons: payload, alteredList: payload,
            };
        case CLEAN_FILTERS:
            return {
                ...state, alteredList: [...state.allPokemons],
            }

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
        case CLEAN_APP:
            return {
                ...state,
                allPokemons: [],
                alteredList: [],
                allTypes: []
            };

        case ORDER:
            let copy;
            if (payload === 'all') {
                return {
                    ...state,
                    alteredList: [...state.allPokemons],
                };
            } else {
                copy = [...state.alteredList].sort((a, b) => {
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
            }

            return {
                ...state,
                alteredList: copy,
            }

        case FILTER:
            const { type, origin } = payload;

            if (type && origin) {
                const filteredList = state.allPokemons.filter(pokemon =>
                    pokemon.types && pokemon.types.includes(type) &&
                    (origin === 'API' ? !pokemon.created : pokemon.created)
                );

                return {
                    ...state,
                    alteredList: filteredList,
                };
            }

            if (type) {
                const filteredList = state.allPokemons.filter(pokemon =>
                    pokemon.types && pokemon.types.includes(type)
                );

                return {
                    ...state,
                    alteredList: filteredList,
                };
            }

            if (origin) {
                const filteredList = state.allPokemons.filter(pokemon =>
                    (origin === 'API' ? !pokemon.created : pokemon.created)
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