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
                <button onClick={clearFilters}>
                    Limpiar Filtros
                </button>
            </div>

            <select className={styles.select} onChange={handleOrder} value={selectedOrder}>
                <option value="" disabled>Order By...</option>
                <option value="A">A - Z</option>
                <option value="D">Z - A</option>
                <option value="hight">Attack mas alto</option>
                <option value="low">Attack mas bajo</option>
            </select>

            <select className={styles.select} onChange={handleFilter} value={selectedType}>
                <option value="" disabled>Filter by types</option>
                {allTypes.map(type => (
                    <option key={type.id} value={type.name}>
                        {type.name}
                    </option>
                ))}
            </select>

            <select className={styles.select} onChange={handleOrigin} value={selectedOrigin}>
                <option value="" disabled>Filter by origin</option>
                <option value="api">Originals</option>
                <option value="db">Creados</option>
            </select>
        </div>
    );
};
