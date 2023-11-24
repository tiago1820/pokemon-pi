import { useEffect, useState } from 'react';
import './App.css';
import { SearchBar, Cards } from './app/components';
import { getPokemonsByPage } from './app/services/pokemonService'

export const App = () => {
    const [pokemons, setPokemons] = useState([]);

    useEffect(() => {
        const getAllPokemons = async () => {
            try {
                const pokeData = await getPokemonsByPage();
                setPokemons(pokeData);
            } catch (error) {
                throw error;
            }
        };
        getAllPokemons();
    }, []);


    return (
        <>
            <SearchBar />
            <Cards pokemons={pokemons} />
        </>
    );
}