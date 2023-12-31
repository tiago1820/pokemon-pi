import { orderCards, filterCards, cleanFilters } from "../app/redux/actions";

export class Utils {

    sortPokemons = (list, order) => {
        if (order === 'all') {
            return [...list];
        } else {
            return [...list].sort((a, b) => {
                if (order === 'A') {
                    return a.name.localeCompare(b.name);
                } else if (order === 'Z') {
                    return b.name.localeCompare(a.name);
                } else if (order === 'hight') {
                    return b.attack - a.attack;
                } else if (order === 'low') {
                    return a.attack - b.attack;
                } else {
                    return 0;
                }
            });
        }
    }

    filterPokemons = (list, { type, origin }) => {
        if (type && origin) {
            return list.filter(pokemon =>
                pokemon.types && pokemon.types.includes(type) &&
                (origin === 'API' ? !pokemon.created : pokemon.created)
            );
        } else if (type) {
            return list.filter(pokemon =>
                pokemon.types && pokemon.types.includes(type)
            );
        } else if (origin) {
            return list.filter(pokemon =>
                (origin === 'API' ? !pokemon.created : pokemon.created)
            );
        }
        return list;
    }

    updateSearchResult = (currentState, newResult) => {
        if (newResult) {
            const isDuplicate = currentState.searchResult.some(result => result.name === newResult.name);

            if (!isDuplicate) {
                return {
                    ...currentState,
                    searchResult: [...currentState.searchResult, newResult]
                };
            } else {
                window.alert('¡No puedes buscar Pokémon repetido!');
            }
        }

        return currentState;
    }

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