import { Card } from '../../components';
import styles from './Cards.module.css';

export const Cards = props => {
    const { pokemons } = props;
    console.log(pokemons);
    return (
        <div className={styles.container}>
            <div className={styles.column}>
                <div className={styles.row}>
                    {pokemons.map((poke => {
                        return (
                            <Card
                                key={poke.id}
                                id={poke.id}
                                name={poke.name}
                                image={poke.img}
                                hp={poke.hp}
                                attack={poke.attack}
                                defense={poke.defense}
                                speed={poke.speed}
                                height={poke.height}
                                weight={poke.weight}
                            />
                        )
                    }))}
                </div>
            </div>
        </div>
    )
}