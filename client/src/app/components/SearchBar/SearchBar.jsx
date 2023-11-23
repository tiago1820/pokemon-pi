import styles from './SearchBar.module.css';

export const SearchBar = props => {

    return (
        <div className={styles.form}>
            <div className={styles.column}>
                <h2>Name or Number</h2>
                <div className={styles.row}>
                    <input
                        className={styles.searchInput}
                        type="search"
                    />
                    <button className={styles.button}>Search</button>

                </div>
            </div>
        </div>
    );
}