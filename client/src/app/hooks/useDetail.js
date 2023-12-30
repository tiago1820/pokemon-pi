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

    const capitalizeFirstLetter = (word) => {
        if (typeof word === 'string' && word.length > 0) {
            return word.charAt(0).toUpperCase() + word.slice(1);
        }
        return '';
    };

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
        dispatch(setReload(true));
        navigate('/app');
    };

    const closeCard = () => {
        navigate('/app');
    };

    return {
        pokemon,
        capitalizeFirstLetter,
        renderBar,
        handleDelete,
        closeCard,
    };
};