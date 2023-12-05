
import { orderCards, filterCards, cleanFilters } from "../app/redux/actions";

export class Utils {
    onClose(id, setPokemons) {
        setPokemons((pokemons) =>
            pokemons.filter((poke) => {
                return poke.id !== id;
            })
        );
    }

    handleOrder(e, dispatch, setSelectedOrder, setAux) {
        dispatch(orderCards(e.target.value));
        setSelectedOrder(e.target.value);
        setAux(!setAux);
    }

    handleFilter(e, setSelectedType, dispatch, selectedOrigin, setAux) {
        setSelectedType(e.target.value);
        dispatch(filterCards(e.target.value, selectedOrigin));
        setAux(!setAux);
    }

    handleOrigin(e, setSelectedOrigin, dispatch, selectedType, setAux) {
        setSelectedOrigin(e.target.value);
        dispatch(filterCards(selectedType, e.target.value));
        setAux(!setAux);
    }

    clearFilters(dispatch, setSelectedOrder, setSelectedType, setSelectedOrigin, setAux) {
        dispatch(cleanFilters());
        setSelectedOrder("");
        setSelectedType("");
        setSelectedOrigin("");
        setAux(!setAux);
    }
}