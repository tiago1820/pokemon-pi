import styles from './Detail.module.css';
import { usePokemon } from '../../hooks/usePokemon';
import pokemonImages from '../../../images/sprites/index';
import defaultImg from '../../../images/default-img.png';
import { useDispatch } from 'react-redux';
import { removePokemon, setLoading, setReload, cleanFilters } from '../../redux/actions';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import editIcon from '../../../images/icons/edit.png';
import garbageIcon from '../../../images/icons/garbageIcon.png';
import deleteIcon from '../../../images/icons/delete.png';

export const Detail = () => {
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
    }

    const closeCard = () => {
        navigate('/app');
    }

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <div className={styles.row}>
                    <div className={styles.left}>
                        <img className={styles.img} src={pokemonImages[pokemon.id] || defaultImg} alt="" />

                        <div className={styles.types}>
                            {pokemon.types &&
                                pokemon.types.map((type) => (
                                    <span key={type} className={`${styles.type} ${styles[type.toLowerCase()]}`}>
                                        {type}
                                    </span>
                                ))}

                        </div>
                    </div>

                    <div className={styles.right}>
                        <button className={styles.closeCard} onClick={closeCard}>
                            <img className={styles.deleteIcon} src={deleteIcon} />
                        </button>
                        <div className={styles.cardContent}>
                            <div className={styles.name}>{capitalizeFirstLetter(pokemon.name)}</div>
                        </div>
                        <div className={styles.attributes}>
                            {renderBar('HP', pokemon.hp)}
                            {renderBar('Attack', pokemon.attack)}
                            {renderBar('Defense', pokemon.defense)}
                            {renderBar('Speed', pokemon.speed)}
                            <div>Height: {pokemon.height}</div>
                            <div>Weight: {pokemon.weight}</div>

                            {pokemon.created && (
                                <>
                                    <Link to={`/app/edit/${pokemon.id}`}>
                                        <button className={styles.btnEdit}>
                                            <img className={styles.editIcon} src={editIcon} />
                                        </button>
                                    </Link>
                                    <button className={styles.btnDel} onClick={handleDelete}>
                                        <img className={styles.garbageIcon} src={garbageIcon} />
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}