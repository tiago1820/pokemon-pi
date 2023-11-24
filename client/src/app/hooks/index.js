import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

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