import { Card, Pagination } from '../../components';
import styles from './Cards.module.css';
import { useCards } from '../../hooks/useCards';

export const Cards = (props) => {
    const {
        allPokemons,
        onClose,
        isHomeRoute,
        currentPage,
        totalPages,
        onPageChange,
    } = props;

    const {
        searchResult,
        showPagination,
        requestError,
        handleRequestError,
    } = useCards();

    return (
        <div className={styles.container}>
            {requestError && requestError !== "" ? (
                <div className={styles.error}>
                    <span>{requestError}</span>
                    <span className={styles.closeButton} onClick={handleRequestError}>x</span>
                </div>
            ) : (
                <div>
                    {showPagination && (
                        <Pagination
                            isHomeRoute={isHomeRoute}
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={onPageChange}
                        />
                    )}

                    <div className={styles.column}>
                        <div className={styles.row}>
                            {searchResult.length > 0 ? (
                                searchResult.map((poke) => (
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
                                allPokemons.map((poke) => (
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

                    {showPagination && (
                        <Pagination
                            isHomeRoute={isHomeRoute}
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={onPageChange}
                        />
                    )}
                </div>
            )}
        </div>
    );
};
