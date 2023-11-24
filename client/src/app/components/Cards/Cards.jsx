import { Card } from '../../components';
import styles from './Cards.module.css';

export const Cards = props => {
    const { allPokemons } = props;
    console.log(allPokemons);
    return (
        <div className={styles.container}>
            <div className={styles.column}>
                <div className={styles.row}>
                    {allPokemons.map((poke => {
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