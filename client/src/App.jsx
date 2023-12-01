import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllPokemons, getAllTypes, orderCards, filterCards, filterOrigin } from './app/redux/actions';
import styles from './App.module.css';
import { Cards, Pagination, Detail, Nav, Loader } from './app/components';
import { Routes, Route, useLocation } from 'react-router-dom';
import axios from 'axios';
import { Create } from './app/components/Create/Create';

export const App = () => {
    const dispatch = useDispatch();
    const location = useLocation();

    const alteredList = useSelector(state => state.alteredList);
    const allTypes = useSelector(state => state.allTypes);

    const [currentPage, setCurrentPage] = useState(1);
    const pokemonsPerPage = 12;
    const [pokemons, setPokemons] = useState([]);
    const [aux, setAux] = useState(false);
    const [loading, setLoading] = useState(true);

    const createPokemon = async pokeData => {

        try {
            const {
                name,
                hp,
                attack,
                defense,
                speed,
                weight,
                height,
                types,
            } = pokeData;

            const URL = 'http://localhost:3001/pokemons';

            const response = await axios.post(URL, {
                name,
                hp,
                attack,
                defense,
                speed,
                weight,
                height,
                types,
            });

        } catch (error) {
            console.error('Error al crear el Pokémon:', error);
            throw error;
        }
    }

    const onSearch = async name => {
        try {
            const { data } = await axios(`http://localhost:3001/pokemons/name?name=${name}`);
            if (data.name) {
                setPokemons(oldPokemons => [...oldPokemons, data]);
            } else {
                window.alert('¡No hay pokemons con este nombre!');
            }
        } catch (error) {
            throw error;
        }
    }

    const handleOrder = (e) => {
        dispatch(orderCards(e.target.value));
        setAux(!aux);
    }

    const handleFilter = (e) => {
        dispatch(filterCards(e.target.value));
        setAux(!aux);
    }

    const handleOrigin = (e) => {
        dispatch(filterOrigin(e.target.value));
        setAux(!aux);
    }

    // useEffect(() => {
    //     dispatch(getAllPokemons());
    //     dispatch(getAllTypes());
    // }, []);

    useEffect(() => {
        const fetchData = async () => {
          try {
            setLoading(true);
            await dispatch(getAllPokemons());
            await dispatch(getAllTypes());
          } catch (error) {
            console.error('Error fetching data:', error);
          } finally {
            setLoading(false);
          }
        };
    
        fetchData();
      }, [dispatch]);

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

            {isHomeRoute && isHomeRoute !== '/app/create' && isHomeRoute !== '/app/detail' && (<Nav onSearch={onSearch} />)}

            {isHomeRoute && (<Pagination
                currentPage={currentPage}
                totalPages={Math.ceil(alteredList.length / pokemonsPerPage)}
                onPageChange={handlePageChange}
            />)}

            <div className={styles.container}>
                {isHomeRoute && isHomeRoute !== '/app/create' && isHomeRoute !== '/app/detail' && (
                    <div className={styles.selectContainer}>
                    {/* <Accordion /> */}
                    <div>
                        <select className={styles.select} onChange={handleOrder}>
                            <option value="" disabled selected>Order By...</option>
                            <option value="all">All</option>
                            <option value="A">A - Z</option>
                            <option value="D">Z - A</option>
                            <option value="hight">Attack mas alto</option>
                            <option value="low">Attack mas bajo</option>
                        </select>
                    </div>

                    <div>
                        <select className={styles.select} onChange={handleFilter}>
                            <option value="" disabled selected>Filter by types</option>
                            <option value="all">All</option>
                            {allTypes.map(type => (
                                <option key={type.id} value={type.name}>
                                    {type.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <select className={styles.select} onChange={handleOrigin}>
                            <option value="" disabled selected>Filter by origin</option>
                            <option value="all">All</option>
                            <option value="api">API</option>
                            <option value="db">Data base</option>
                        </select>
                    </div>
                </div>
                )

                }
                <Routes>
                    <Route path='/app' element={<Cards allPokemons={currentPokemons} pokemons={pokemons} />} />
                    <Route path='/app/detail/:id' element={<Detail />} />
                    <Route path='/app/create' element={<Create createPokemon={createPokemon} />} />
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