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
    REQUEST_ERROR,
    SEARCH_RESULT,
    SEARCH_UPDATE
} from "./action-types";

const initialState = {
    allPokemons: [],
    allTypes: [],
    pokemonDetail: [],
    alteredList: [],
    loading: true,
    reload: false,
    requestError: "",
    searchResult: [],

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

        case SEARCH_UPDATE:
            return {
                ...state, searchResult: payload
            }

        case SEARCH_RESULT:

            if (payload) {
                const isDuplicate = state.searchResult.some(result => result.name === payload.name);

                if (!isDuplicate) {
                    return {
                        ...state,
                        searchResult: [...state.searchResult, payload]
                    };
                } else {
                    window.alert('¡No puedes buscar Pokémon repetido!');
                }

                return {
                    ...state
                }

            }

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
                    } else if (payload === 'Z') {
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
                requestError: copy.length === 0 ? "La lista está vacía" : "",
            }

        case FILTER:
            const { type, origin, order } = payload;
            let filteredList;

            if (type && origin) {
                filteredList = state.allPokemons.filter(pokemon =>
                    pokemon.types && pokemon.types.includes(type) &&
                    (origin === 'API' ? !pokemon.created : pokemon.created)
                );
            } else if (type) {
                filteredList = state.allPokemons.filter(pokemon =>
                    pokemon.types && pokemon.types.includes(type)
                );
            } else if (origin) {
                filteredList = state.allPokemons.filter(pokemon =>
                    (origin === 'API' ? !pokemon.created : pokemon.created)
                );
            }

            // Aplicar ordenación a la lista filtrada
            let copy2;
            if (order === 'all') {
                copy2 = [...state.allPokemons];
            } else {
                copy2 = [...filteredList].sort((a, b) => {
                    if (order === 'A') {
                        return a.name.localeCompare(b.name);
                    } else if (order === 'Z') {
                        return b.name.localeCompare(a.name);
                    } else if (order === 'hight') {
                        return b.attack - a.attack;
                    } else if (order === 'low') {
                        return a.attack - b.attack
                    } else {
                        return 0;
                    }
                });
            }

            return {
                ...state,
                alteredList: copy2,
                requestError: copy2.length === 0 ? "La lista está vacía" : "",
            };



        default:
            return {
                ...state
            };
    }
}

export default rootReducer;