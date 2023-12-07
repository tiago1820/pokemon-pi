import { Card, Pagination } from '../../components';
import styles from './Cards.module.css';

export const Cards = props => {
    const {
        allPokemons,
        pokemons,
        onClose,
        isHomeRoute,
        currentPage,
        totalPages,
        onPageChange



    } = props;

    return (
        <div className={styles.container}>
            <Pagination
                isHomeRoute={isHomeRoute}
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={onPageChange}
            />
            <div className={styles.column}>
                <div className={styles.row}>
                    {pokemons.length > 0 ? (
                        pokemons.map(poke => (
                            <Card
                                key={poke.id}
                                id={poke.id}
                                name={poke.name}
                                image={poke.img}
                                hp={poke.hp}
                                types={poke.types}
                                attack={poke.attack}
                                defense={poke.defense}
                                speed={poke.speed}
                                height={poke.height}
                                weight={poke.weight}
                                onClose={onClose}
                            />
                        ))
                    ) : (
                        allPokemons.map(poke => (
                            <Card
                                key={poke.id}
                                id={poke.id}
                                name={poke.name}
                                image={poke.img}
                                hp={poke.hp}
                                types={poke.types}
                                attack={poke.attack}
                                defense={poke.defense}
                                speed={poke.speed}
                                height={poke.height}
                                weight={poke.weight}
                            />
                        ))
                    )}
                </div>
            </div>

            <Pagination
                isHomeRoute={isHomeRoute}
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={onPageChange}
            />
        </div>
    );
}