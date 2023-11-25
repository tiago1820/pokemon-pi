import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllPokemons } from './app/redux/actions';
import './App.css';
import { SearchBar, Cards, Pagination, Detail } from './app/components';
import { Routes, Route, useLocation, useNavigation } from 'react-router-dom';
// import { getPokemonsByPage } from './app/services/pokemonService'

export const App = () => {
    const dispatch = useDispatch();
    const location = useLocation();

    const allPokemons = useSelector(state => state.allPokemons);
    const [currentPage, setCurrentPage] = useState(1);
    const pokemonsPerPage = 12;

    useEffect(() => {
        dispatch(getAllPokemons());
    }, []);

    const indexOfLastPokemon = currentPage * pokemonsPerPage;
    const indexOfFirstPokemon = indexOfLastPokemon - pokemonsPerPage;
    const currentPokemons = allPokemons.slice(indexOfFirstPokemon, indexOfLastPokemon);

    const handlePageChange = pageNumber => {
        setCurrentPage(pageNumber);
    }

    const isHomeRoute = location.pathname === '/app';

    return (
        <>
            {isHomeRoute && (<SearchBar />)}
            {isHomeRoute && (<Pagination
                currentPage={currentPage}
                totalPages={Math.ceil(allPokemons.length / pokemonsPerPage)}
                onPageChange={handlePageChange}
            />)}

            <Routes>
                <Route path='/app' element={<Cards allPokemons={currentPokemons} />} />
                <Route path='/app/detail/:id' element={<Detail />} />
            </Routes>

            {isHomeRoute && (<Pagination
                currentPage={currentPage}
                totalPages={Math.ceil(allPokemons.length / pokemonsPerPage)}
                onPageChange={handlePageChange}
            />)}
        </>
    );
}