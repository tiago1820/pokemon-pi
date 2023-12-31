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

import { Utils } from "../../utils";
const utils = new Utils();

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
            return utils.updateSearchResult(state, payload);

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
            const copy = utils.sortPokemons(state.alteredList, payload);

            return {
                ...state,
                alteredList: copy,
                requestError: copy.length === 0 ? "La lista está vacía" : "",
            }

        case FILTER:
            const { type, origin, order } = payload;
            const filteredList = utils.filterPokemons(state.allPokemons, { type, origin });
            const copy2 = utils.sortPokemons(filteredList, order);

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