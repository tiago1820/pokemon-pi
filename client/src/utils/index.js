
import { orderCards, filterCards, cleanFilters } from "../app/redux/actions";

export const closePokemon = (id, setPokemons) => {
    setPokemons((pokemons) =>
        pokemons.filter((poke) => {
            return poke.id !== id;
        })
    );
};

export const handleOrderChange = (e, dispatch, setSelectedOrder, setAux) => {
    dispatch(orderCards(e.target.value));
    setSelectedOrder(e.target.value);
    setAux(!setAux);
};

export const handleFilterChange = (e, setSelectedType, dispatch, selectedOrigin, setAux) => {
    setSelectedType(e.target.value);
    dispatch(filterCards(e.target.value, selectedOrigin));
    setAux(!setAux);
};

export const handleOriginChange = (e, setSelectedOrigin, dispatch, selectedType, setAux) => {
    setSelectedOrigin(e.target.value);
    dispatch(filterCards(selectedType, e.target.value));
    setAux(!setAux);
};

export const clearAllFilters = (dispatch, setSelectedOrder, setSelectedType, setSelectedOrigin, setAux) => {
    dispatch(cleanFilters());
    setSelectedOrder("");
    setSelectedType("");
    setSelectedOrigin("");
    setAux(!setAux);
};
