import styles from './Detail.module.css';
import pokemonImages from '../../../images/sprites/index';
import defaultImg from '../../../images/default-img.png';
import { Link } from 'react-router-dom';
import editIcon from '../../../images/icons/edit.png';
import garbageIcon from '../../../images/icons/garbageIcon.png';
import deleteIcon from '../../../images/icons/delete.png';
import { useDetail } from '../../hooks/useDetail';

export const Detail = () => {
    const { pokemon, capitalizeFirstLetter, renderBar, handleDelete, closeCard } = useDetail();

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