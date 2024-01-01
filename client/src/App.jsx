import { useEffect, useState } from 'react';
import { handleOrderChange, handleFilterChange, handleOriginChange, clearAllFilters } from './utils';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { getAllPokemons, getAllTypes, cleanApp, setReload, setLoading, searchUpdate } from './app/redux/actions';
import { AppRoutes, Loader, Nav, SearchBar, FilterSelects } from './app/components';
import styles from './App.module.css';

export const App = () => {

    const [selectedOrder, setSelectedOrder] = useState("");
    const [selectedType, setSelectedType] = useState("");
    const [selectedOrigin, setSelectedOrigin] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [aux, setAux] = useState(false);

    const alteredList = useSelector(state => state.alteredList);
    const allTypes = useSelector(state => state.allTypes);
    const loading = useSelector(state => state.loading);
    const reload = useSelector(state => state.reload);
    const searchResult = useSelector(state => state.searchResult);

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
        const updatedList = searchResult.filter((poke) => {
            return poke.id !== id;
        })

        dispatch(searchUpdate(updatedList))
    }

    const indexOfLastPokemon = currentPage * pokemonsPerPage;
    const indexOfFirstPokemon = indexOfLastPokemon - pokemonsPerPage;
    const currentPokemons = alteredList.slice(indexOfFirstPokemon, indexOfLastPokemon);

    const handlePageChange = pageNumber => {
        setCurrentPage(pageNumber);
    }

    useEffect(() => {
        setSelectedOrder("");
        setSelectedOrigin("");
        setSelectedType("")

        const fetchData = async () => {
            try {
                await Promise.all([dispatch(getAllPokemons()), dispatch(getAllTypes())]);
            } catch (error) {
                window.alert("Error al cargar los pokemons.");
            } finally {
                dispatch(setReload(false));
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

    return (
        <>
            {loading && <Loader />}
            {loading === false &&
                <div className={styles.appContainer}>
                    {location.pathname && location.pathname !== '/' && <Nav />}

                    {isHomeRoute && isHomeRoute !== '/app/create' && isHomeRoute !== '/app/detail' && (<SearchBar />)}
                    <div className={styles.row}>
                        {isHomeRoute && isHomeRoute !== '/app/create' && isHomeRoute !== '/app/detail' && (
                            <FilterSelects
                                clearFilters={clearFilters}
                                handleOrder={handleOrder}
                                handleFilter={handleFilter}
                                handleOrigin={handleOrigin}
                                selectedOrder={selectedOrder}
                                selectedType={selectedType}
                                selectedOrigin={selectedOrigin}
                                allTypes={allTypes}
                            />
                        )}

                        <AppRoutes
                            currentPokemons={currentPokemons}
                            pokemons={searchResult}
                            onClose={onClose}

                            isHomeRoute={isHomeRoute}
                            currentPage={currentPage}
                            totalPages={Math.ceil(alteredList.length / pokemonsPerPage)}
                            onPageChange={handlePageChange}
                        />
                    </div>

                </div>

            }

        </>
    );
}