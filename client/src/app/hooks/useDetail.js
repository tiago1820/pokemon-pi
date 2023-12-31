// usePokemonDetail.js
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { removePokemon, setLoading, setReload, cleanFilters } from '../redux/actions';
import { usePokemon } from './usePokemon';
import styles from "../components/Detail/Detail.module.css";

export const useDetail = () => {
    const pokemon = usePokemon();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const renderBar = (label, value) => {
        const width = (value / 100) * 100; // Rango: 0 a 100
        return (
            <div className={styles.barContainer} key={label}>
                <div className={styles.barLabel}>{label}</div>
                <div className={styles.bar}>
                    <div className={styles.barFill} style={{ width: `${width}%` }} />
                    <div className={styles.barValue}>{value}</div>
                </div>
            </div>
        );
    };

    const handleDelete = () => {
        dispatch(removePokemon(pokemon.id));
        dispatch(cleanFilters());
        dispatch(setLoading(true));
        dispatch(setReload(+1));
        navigate('/app');
    };

    const closeCard = () => {
        navigate('/app');
    };

    return {
        pokemon,
        renderBar,
        handleDelete,
        closeCard,
    };
};