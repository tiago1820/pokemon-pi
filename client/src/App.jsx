import { Utils } from './utils';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllPokemons, getAllTypes, orderCards, filterCards, filterOrigin, cleanFilters } from './app/redux/actions';
import styles from './App.module.css';
import { Cards, Pagination, Detail, Nav, Loader, SearchBar, Edit } from './app/components';
import { Routes, Route, useLocation } from 'react-router-dom';
import axios from 'axios';
import { Create } from './app/components/Create/Create';
const IP = process.env.REACT_APP_IP;

export const App = () => {
    const utils = new Utils();

    const dispatch = useDispatch();
    const location = useLocation();

    const alteredList = useSelector(state => state.alteredList);
    const allTypes = useSelector(state => state.allTypes);

    const [currentPage, setCurrentPage] = useState(1);
    const pokemonsPerPage = 12;
    const [pokemons, setPokemons] = useState([]);
    const [aux, setAux] = useState(false);
    const [loading, setLoading] = useState(true);

    const [selectedOrder, setSelectedOrder] = useState("");
    const [selectedType, setSelectedType] = useState("");
    const [selectedOrigin, setSelectedOrigin] = useState("");


    const onSearch = async name => {
        try {
            const { data } = await axios(`${IP}:3001/pokemons/name?name=${name}`);
            if (data.name) {
                const isDuplicate = pokemons.some(pokemon => pokemon.name === data.name);
                if (isDuplicate) {
                    window.alert('¡No puedes buscar Pokémon repetido!');
                } else {
                    setPokemons(oldPokemons => [...oldPokemons, data]);
                }

            }
        } catch (error) {
            window.alert('¡No hay pokemons con este nombre!');
        }
    }

    const onClose = (id) => {
        utils.onClose(id, setPokemons);
    };

    const handleOrder = (e) => {
        utils.handleOrder(e, dispatch, setSelectedOrder, setAux);
    };

    const handleFilter = (e) => {
        utils.handleFilter(e, setSelectedType, dispatch, selectedOrigin, setAux);
    };

    const handleOrigin = (e) => {
        utils.handleOrigin(e, setSelectedOrigin, dispatch, selectedType, setAux);
    };

    const clearFilters = () => {
        utils.clearFilters(dispatch, setSelectedOrder, setSelectedType, setSelectedOrigin, setAux);
    };

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

    const indexOfLastPokemon = currentPage * pokemonsPerPage;
    const indexOfFirstPokemon = indexOfLastPokemon - pokemonsPerPage;
    const currentPokemons = alteredList.slice(indexOfFirstPokemon, indexOfLastPokemon);

    const handlePageChange = pageNumber => {
        setCurrentPage(pageNumber);
    }

    const isHomeRoute = location.pathname === '/app';

    return (
        <div className={styles.appContainer}>
            {loading && <Loader />}

            <Nav onSearch={onSearch} />
            {/* {isHomeRoute && (<Nav onSearch={onSearch} />)} */}
            {isHomeRoute && isHomeRoute !== '/app/create' && isHomeRoute !== '/app/detail' && (<SearchBar onSearch={onSearch} />)}

            {isHomeRoute && (<Pagination
                currentPage={currentPage}
                totalPages={Math.ceil(alteredList.length / pokemonsPerPage)}
                onPageChange={handlePageChange}
            />)}

            <div className={styles.container}>
                {isHomeRoute && isHomeRoute !== '/app/create' && isHomeRoute !== '/app/detail' && (
                    <div className={styles.selectContainer}>
                        <div>
                            {/* <button className={styles.clearButton} onClick={clearFilters}> */}
                            <button onClick={clearFilters}>
                                Limpiar Filtros
                            </button>
                        </div>

                        <select className={styles.select} onChange={handleOrder} value={selectedOrder}>
                            <option value="" disabled>Order By...</option>
                            <option value="A">A - Z</option>
                            <option value="D">Z - A</option>
                            <option value="hight">Attack mas alto</option>
                            <option value="low">Attack mas bajo</option>
                        </select>

                        <select className={styles.select} onChange={handleFilter} value={selectedType}>
                            <option value="" disabled>Filter by types</option>
                            {allTypes.map(type => (
                                <option key={type.id} value={type.name}>
                                    {type.name}
                                </option>
                            ))}
                        </select>

                        <select className={styles.select} onChange={handleOrigin} value={selectedOrigin} >
                            <option value="" disabled>Filter by origin</option>
                            <option value="api">Originals</option>
                            <option value="db">Creados</option>
                        </select>
                    </div>
                )

                }
                <Routes>
                    <Route path='/app' element={<Cards allPokemons={currentPokemons} pokemons={pokemons} onClose={onClose} />} />
                    <Route path='/app/detail/:id' element={<Detail />} />
                    <Route path='/app/create' element={<Create />} />
                    <Route path='/app/edit/:id' element={<Edit />} />
                </Routes>
            </div>

            {isHomeRoute && (<Pagination
                currentPage={currentPage}
                totalPages={Math.ceil(alteredList.length / pokemonsPerPage)}
                onPageChange={handlePageChange}
            />)}
        </div>
    );
}