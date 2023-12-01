import styles from './Detail.module.css';
import { usePokemon } from '../../hooks/usePokemon';

export const Detail = () => {
    const pokemon = usePokemon();

    const capitalizeFirstLetter = (word) => {
        if (typeof word === 'string' && word.length > 0) {
            return word.charAt(0).toUpperCase() + word.slice(1);
        }
        return '';
    };

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <img className={styles.img} src={pokemon.img} alt="" />

                <div className={styles.cardContent}>
                    <div className={styles.name}>{capitalizeFirstLetter(pokemon.name)}</div>
                </div>
                <div className={styles.attributes}>
                    <div>HP: {pokemon.hp}</div>
                    <div>Attack: {pokemon.attack}</div>
                    <div>Defense: {pokemon.defense}</div>
                    <div>Speed: {pokemon.speed}</div>
                    <div>Height: {pokemon.height}</div>
                    <div>Weight: {pokemon.weight}</div>
                </div>

                <div className={styles.types}>
                    {pokemon.types &&
                        pokemon.types.map((type, index) => (
                            <span key={index} className={`${styles.type} ${styles[type.toLowerCase()]}`}>
                                {type}
                            </span>
                        ))}
                </div>
            </div>

        </div>
    )
}