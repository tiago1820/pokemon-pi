import styles from './Detail.module.css';
import { usePokemon } from '../../hooks';

export const Detail = () => {
    const pokemon = usePokemon();

    console.log(pokemon);
    const { id, name, img, hp, attack, defense, speed, height, weight, created, types } = pokemon;

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <img className={styles.img} src={img} alt="" />

                <div className={styles.cardContent}>
                    <div className={styles.name}>{name}</div>
                </div>

                {
                    types && types.length > 0 && (
                        <div className={styles.types}>
                            {types.map((type, index) => (
                                <span key={index} className={styles.type}>
                                    {type}
                                </span>
                            ))}
                        </div>
                    )
                }
            </div>

        </div>
    )
}