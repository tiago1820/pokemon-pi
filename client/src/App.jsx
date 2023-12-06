import { Utils } from './utils';
import { Service } from './services/index';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { getAllPokemons, getAllTypes } from './app/redux/actions';
import { AppRoutes, Loader, Nav, Pagination, SearchBar, FilterSelects } from './app/components';
import styles from './App.module.css';

export const App = () => {
    const utils = new Utils();
    const service = new Service();

    // local states
    const [selectedOrder, setSelectedOrder] = useState("");
    const [selectedType, setSelectedType] = useState("");
    const [selectedOrigin, setSelectedOrigin] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [pokemons, setPokemons] = useState([]);
    const [aux, setAux] = useState(false);
    const [loading, setLoading] = useState(true);

    // global states
    const alteredList = useSelector(state => state.alteredList);
    const allTypes = useSelector(state => state.allTypes);

    // othes
    const dispatch = useDispatch();
    const location = useLocation();
    const pokemonsPerPage = 12;
    const isHomeRoute = location.pathname === '/app';

    // utils and services functions
    const handleSearch = async (name) => {
        try {
            await service.onSearch(name, pokemons, setPokemons);
        } catch (error) {
            console.error('Error al buscar el Pokémon:', error);
        }
    };

    const handleOrder = (e) => {
        utils.handleOrderChange(e, dispatch, setSelectedOrder, setAux);
    };

    const handleFilter = (e) => {
        utils.handleFilterChange(e, setSelectedType, dispatch, selectedOrigin, setAux);
    };

    const handleOrigin = (e) => {
        utils.handleOriginChange(e, setSelectedOrigin, dispatch, selectedType, setAux);
    };

    const clearFilters = () => {
        utils.clearAllFilters(dispatch, setSelectedOrder, setSelectedType, setSelectedOrigin, setAux);
    };

    const onClose = (id) => {
        utils.closePokemon(id, setPokemons);
    };

    // pagination
    const indexOfLastPokemon = currentPage * pokemonsPerPage;
    const indexOfFirstPokemon = indexOfLastPokemon - pokemonsPerPage;
    const currentPokemons = alteredList.slice(indexOfFirstPokemon, indexOfLastPokemon);

    const handlePageChange = pageNumber => {
        setCurrentPage(pageNumber);
    }

    // useEffects
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                await Promise.all([dispatch(getAllPokemons()), dispatch(getAllTypes())]);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        setCurrentPage(1);
    }, [alteredList]);

    return (
        <div className={styles.appContainer}>
            {loading && <Loader />}

            <Nav />
            {/* {isHomeRoute && (<Nav onSearch={onSearch} />)} */}
            {isHomeRoute && isHomeRoute !== '/app/create' && isHomeRoute !== '/app/detail' && (<SearchBar handleSearch={handleSearch} />)}

            {isHomeRoute && (<Pagination
                currentPage={currentPage}
                totalPages={Math.ceil(alteredList.length / pokemonsPerPage)}
                onPageChange={handlePageChange}
            />)}

            <div className={styles.container}>
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
                )

                }
                <AppRoutes currentPokemons={currentPokemons} pokemons={pokemons} onClose={onClose} />
            </div>

            {isHomeRoute && (<Pagination
                currentPage={currentPage}
                totalPages={Math.ceil(alteredList.length / pokemonsPerPage)}
                onPageChange={handlePageChange}
            />)}
        </div>
    );
}