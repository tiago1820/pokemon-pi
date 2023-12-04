import styles from './Detail.module.css';
import { usePokemon } from '../../hooks/usePokemon';
import pokemonImages from '../../../images/sprites/index';
import defaultImg from '../../../images/default-img.png';


export const Detail = () => {
    const pokemon = usePokemon();

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

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                {/* id de la imagen */}
                <div className={styles.row}>
                    <div className={styles.left}>
                        <img className={styles.img} src={pokemonImages[pokemon.id] || defaultImg} alt="" />

                        <div className={styles.types}>
                            {pokemon.types &&
                                pokemon.types.map((type, index) => (
                                    <span key={index} className={`${styles.type} ${styles[type.toLowerCase()]}`}>
                                        {type}
                                    </span>
                                ))}
                        </div>
                    </div>

                    <div className={styles.right}>
                        {/* <div className={styles.cardContent}>
    <div className={styles.name}>{capitalizeFirstLetter(pokemon.name)}</div>
</div> */}
                        <div className={styles.attributes}>
                            {renderBar('HP', pokemon.hp)}
                            {renderBar('Attack', pokemon.attack)}
                            {renderBar('Defense', pokemon.defense)}
                            {renderBar('Speed', pokemon.speed)}
                            {/* {renderBar('Height', pokemon.height)}
    {renderBar('Weight', pokemon.weight)} */}
                            <div>Height: {pokemon.height}</div>
                            <div>Weight: {pokemon.weight}</div>
                            <button className={styles.btnEdit}>E</button>
                            <button className={styles.btnDel}>X</button>
                        </div>

                    </div>
                </div>


            </div>

        </div>
    )
}