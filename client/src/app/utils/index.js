import { orderCards, filterCards, cleanFilters } from "../redux/actions";

export const capitalizeFirstLetter = (word) => {
    if (typeof word === 'string' && word.length > 0) {
        return word.charAt(0).toUpperCase() + word.slice(1);
    }
    return '';
};

export const sortPokemons = (list, order) => {
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
};

export const filterPokemons = (list, { type, origin }) => {
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
};

export const updateSearchResult = (currentState, newResult) => {
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
};

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

export const handleFilterChange = (e, setSelectedType, dispatch, selectedOrigin, selectedOrder, setAux) => {
    setSelectedType(e.target.value);
    dispatch(filterCards(e.target.value, selectedOrigin, selectedOrder));
    setAux(!setAux);
};

export const handleOriginChange = (e, setSelectedOrigin, dispatch, selectedType, selectedOrder, setAux) => {
    setSelectedOrigin(e.target.value);
    dispatch(filterCards(selectedType, e.target.value, selectedOrder));
    setAux(!setAux);
};

export const clearAllFilters = (dispatch, setSelectedOrder, setSelectedType, setSelectedOrigin, setAux) => {
    dispatch(cleanFilters());
    setSelectedOrder("");
    setSelectedType("");
    setSelectedOrigin("");
    setAux(!setAux);
};