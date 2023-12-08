import styles from './FilterSelects.module.css';

export const FilterSelects = ({
    clearFilters,
    handleOrder,
    handleFilter,
    handleOrigin,
    selectedOrder,
    selectedType,
    selectedOrigin,
    allTypes
}) => {
    return (
        <div className={styles.selectContainer}>
            <div>
                <div>
                    <button
                        className={`${styles.select} ${styles.buttonClear}`}
                        onClick={clearFilters}
                        title='Limpia todos los filtros.'
                    >Limpiar Filtros
                    </button>
                </div>
            </div>

            <select
                className={styles.select}
                onChange={handleOrder}
                value={selectedOrder}
                title='Ordenar pokemons por: orden alfabetica y valor de ataque.'
            >
                <option value="" disabled>Order By...</option>
                <option
                    value="A"
                    title='Ordenar pokemons por nombre de A a Z.'
                >A - Z</option>

                <option
                    value="D"
                    title='Ordenar pokemons por nombre de Z a A.'
                >Z - A</option>
                <option
                    value="hight"
                    title='Ordenar pokemons por los que tienen el valor de ataque mas alto.'
                >Attack mas alto</option>
                <option
                    value="low"
                    title='Ordenar los pokemons por los que tienen el valor de ataque mas bajo.'
                >Attack mas bajo</option>
            </select>

            <select
                className={styles.select}
                onChange={handleFilter}
                value={selectedType}
                title='Muestra todos los pokemon de un determinado tipo elegido.'
            >
                <option value="" disabled>Filter by types</option>
                {allTypes.map(type => (
                    <option key={type.id} value={type.name}>
                        {type.name}
                    </option>
                ))}
            </select>

            <select
                className={styles.select}
                onChange={handleOrigin}
                value={selectedOrigin}
                title='Filtra los pokemons que son originales del universo Pokemon y los pokemons son creados por el usuario.'
            >
                <option value="" disabled>Filter by origin</option>
                <option value="API">Originals</option>
                <option value="db">Creados</option>
            </select>
        </div>
    );
};
