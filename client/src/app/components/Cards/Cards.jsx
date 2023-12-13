import { useDispatch, useSelector } from 'react-redux';
import { Card, Pagination } from '../../components';
import styles from './Cards.module.css';
import { setRequestError } from '../../redux/actions';

export const Cards = (props) => {
    const {
        allPokemons,
        pokemons,
        onClose,
        isHomeRoute,
        currentPage,
        totalPages,
        onPageChange,
    } = props;

    const showPagination = pokemons.length === 0;
    const requestError = useSelector(state => state.requestError);
    const dispatch = useDispatch();

    const handleRequestError = () => {
        dispatch(setRequestError(""));
    }

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
                            {pokemons.length > 0 ? (
                                pokemons.map((poke) => (
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
