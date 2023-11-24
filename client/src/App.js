import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllPokemons } from './app/redux/actions';
import './App.css';
import { SearchBar, Cards, Pagination } from './app/components';
// import { getPokemonsByPage } from './app/services/pokemonService'

export const App = () => {
    const dispatch = useDispatch();
    
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

    return (
        <>
            <SearchBar />
            <Cards allPokemons={currentPokemons} />
            <Pagination
                currentPage={currentPage}
                totalPages={Math.ceil(allPokemons.length / pokemonsPerPage)}
                onPageChange={handlePageChange}
            />
        </>
    );
}