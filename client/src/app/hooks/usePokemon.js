import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { cleanDetail, getPokemonDetail } from '../redux/actions';

export const usePokemon = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const pokemon = useSelector((state) => state.pokemonDetail);

    useEffect(() => {
        dispatch(getPokemonDetail(id));

        return () => {
            dispatch(cleanDetail());
        };
    }, [id]);

    return pokemon;

}