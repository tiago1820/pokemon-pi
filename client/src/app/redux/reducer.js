import { GET_ALL_POKEMONS } from "./action-types";

const initialState = {
    allPokemons: [],
}

const rootReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case GET_ALL_POKEMONS:
            return {
                ...state, allPokemons: payload
            };

        default:
            return {
                ...state
            };
    }
}

export default rootReducer;