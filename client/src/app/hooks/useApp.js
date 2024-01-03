import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import {
    handleOrderChange,
    handleFilterChange,
    handleOriginChange,
    clearAllFilters,
} from '../utils';
import {
    getAllPokemons,
    getAllTypes,
    cleanApp,
    setReload,
    setLoading,
    searchUpdate,
} from '../redux/actions';

export const useApp = () => {
    const [selectedOrder, setSelectedOrder] = useState('');
    const [selectedType, setSelectedType] = useState('');
    const [selectedOrigin, setSelectedOrigin] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [aux, setAux] = useState(false);

    const alteredList = useSelector((state) => state.alteredList);
    const allTypes = useSelector((state) => state.allTypes);
    const loading = useSelector((state) => state.loading);
    const reload = useSelector((state) => state.reload);

    console.log("RELOAD", reload);
    const searchResult = useSelector((state) => state.searchResult);

    const dispatch = useDispatch();
    const location = useLocation();
    const pokemonsPerPage = 12;
    const isHomeRoute = location.pathname === '/app';

    const handleOrder = (e) => {
        handleOrderChange(e, dispatch, setSelectedOrder, setAux);
    };

    const handleFilter = (e) => {
        handleFilterChange(e, setSelectedType, dispatch, selectedOrigin, selectedOrder, setAux);
    };

    const handleOrigin = (e) => {
        handleOriginChange(e, setSelectedOrigin, dispatch, selectedType, selectedOrder, setAux);
    };

    const clearFilters = () => {
        clearAllFilters(dispatch, setSelectedOrder, setSelectedType, setSelectedOrigin, setAux);
    };

    const onClose = (id) => {
        const updatedList = searchResult.filter((poke) => poke.id !== id);
        dispatch(searchUpdate(updatedList));
    };

    const indexOfLastPokemon = currentPage * pokemonsPerPage;
    const indexOfFirstPokemon = indexOfLastPokemon - pokemonsPerPage;
    const currentPokemons = alteredList.slice(indexOfFirstPokemon, indexOfLastPokemon);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    useEffect(() => {
        setSelectedOrder('');
        setSelectedOrigin('');
        setSelectedType('');

        const fetchData = async () => {
            try {
                await Promise.all([dispatch(getAllPokemons()), dispatch(getAllTypes())]);
            } catch (error) {
                window.alert('Error al cargar los pokemons.');
            } finally {
                // dispatch(setReload(false));
                dispatch(setLoading(false));
            }
        };

        fetchData();

        return () => {
            dispatch(cleanApp());
        };
    }, [reload]);

    useEffect(() => {
        setCurrentPage(1);
    }, [alteredList]);

    return {
        selectedOrder,
        selectedType,
        selectedOrigin,
        currentPage,
        aux,
        location,
        alteredList,
        allTypes,
        loading,
        searchResult,
        isHomeRoute,
        handleOrder,
        handleFilter,
        handleOrigin,
        clearFilters,
        onClose,
        currentPokemons,
        handlePageChange,
        pokemonsPerPage
    };
};