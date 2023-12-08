
import { ActionServices } from '../../services/actionServices';
const actService = new ActionServices();

export const getAllPokemons = () => {
    return async (dispatch) => {
        try {
            const data = await actService.getAllPokemons();
            dispatch(data);
        } catch (error) {
            throw error;
        }
    }
}

export const getAllTypes = () => {
    return async (dispatch) => {
        try {
            const data = await actService.getAllTypes();
            dispatch(data);
        } catch (error) {
            throw error;
        }
    }
}

export const removePokemon = (id) => {
    return async (dispatch) => {
        try {
            const data = await actService.removePokemon(id);
            dispatch(data);
        } catch (error) {
            throw error;
        }
    }
}

export const getPokemonDetail = id => {
    return async (dispatch) => {
        try {
            const data = await actService.getPokemonDetail(id);
            dispatch(data);
        } catch (error) {
            throw error;
        }
    }
}

export const cleanDetail = () => {
    actService.cleanDetail();
}

export const cleanApp = () => {
    actService.cleanApp();
}

export const cleanFilters = () => {
    actService.cleanFilters();
}


export const orderCards = order => {
    actService.orderCards(order);
};

export const filterCards = (type, origin) => {
    actService.filterCards(type, origin);
};

export const filterOrigin = origin => {
    actService.filterCards(origin);
};