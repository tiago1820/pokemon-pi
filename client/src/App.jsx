import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllPokemons, getAllTypes, orderCards, filterCards } from './app/redux/actions';
import styles from './App.module.css';
import { SearchBar, Cards, Pagination, Detail } from './app/components';
import { Routes, Route, useLocation } from 'react-router-dom';
import axios from 'axios';

export const App = () => {
    const dispatch = useDispatch();
    const location = useLocation();

    const alteredList = useSelector(state => state.alteredList);
    const allTypes = useSelector(state => state.allTypes);

    const [currentPage, setCurrentPage] = useState(1);
    const pokemonsPerPage = 12;
    const [pokemons, setPokemons] = useState([]);
    const [aux, setAux] = useState(false);

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


    useEffect(() => {
        dispatch(getAllPokemons());
        dispatch(getAllTypes());
    }, []);

    const indexOfLastPokemon = currentPage * pokemonsPerPage;
    const indexOfFirstPokemon = indexOfLastPokemon - pokemonsPerPage;
    const currentPokemons = alteredList.slice(indexOfFirstPokemon, indexOfLastPokemon);

    const handlePageChange = pageNumber => {
        setCurrentPage(pageNumber);
    }

    const isHomeRoute = location.pathname === '/app';

    return (
        <>
            {isHomeRoute && (<SearchBar onSearch={onSearch} />)}
            {isHomeRoute && (<Pagination
                currentPage={currentPage}
                totalPages={Math.ceil(alteredList.length / pokemonsPerPage)}
                onPageChange={handlePageChange}
            />)}

            <div className={styles.selectContainer}>
                <select className={styles.select} onChange={handleOrder}>
                    <option value="all">All</option>
                    <option value="A">A - Z</option>
                    <option value="D">Z - A</option>
                    <option value="hight">Attack mas alto</option>
                    <option value="low">Attack mas bajo</option>
                </select>
            </div>

            <div className={styles.selectContainer}>
                <select className={styles.select} onChange={handleFilter}>
                    <option value="all">All</option>
                    {allTypes.map(type => (
                        <option key={type.id} value={type.name}>
                            {type.name}
                        </option>
                    ))}
                </select>
            </div>

            <Routes>
                <Route path='/app' element={<Cards allPokemons={currentPokemons} pokemons={pokemons} />} />
                <Route path='/app/detail/:id' element={<Detail />} />
            </Routes>

            {isHomeRoute && (<Pagination
                currentPage={currentPage}
                totalPages={Math.ceil(alteredList.length / pokemonsPerPage)}
                onPageChange={handlePageChange}
            />)}
        </>
    );
}