import { orderCards, filterCards, cleanFilters } from "../app/redux/actions";

export class Utils {
    
    closePokemon(id, setPokemons) {
        setPokemons((pokemons) =>
            pokemons.filter((poke) => {
                return poke.id !== id;
            })
        );
    }

    handleOrderChange(e, dispatch, setSelectedOrder, setAux) {
        dispatch(orderCards(e.target.value));
        setSelectedOrder(e.target.value);
        setAux(!setAux);
    }

    handleFilterChange(e, setSelectedType, dispatch, selectedOrigin, selectedOrder, setAux) {
        setSelectedType(e.target.value);
        dispatch(filterCards(e.target.value, selectedOrigin, selectedOrder));
        setAux(!setAux);
    }

    handleOriginChange(e, setSelectedOrigin, dispatch, selectedType, selectedOrder, setAux) {
        setSelectedOrigin(e.target.value);
        dispatch(filterCards(selectedType, e.target.value, selectedOrder));
        setAux(!setAux);
    }

    clearAllFilters(dispatch, setSelectedOrder, setSelectedType, setSelectedOrigin, setAux) {
        dispatch(cleanFilters());
        setSelectedOrder("");
        setSelectedType("");
        setSelectedOrigin("");
        setAux(!setAux);
    }

}