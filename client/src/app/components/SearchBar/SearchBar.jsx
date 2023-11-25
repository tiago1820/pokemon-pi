import { useState } from 'react';
import styles from './SearchBar.module.css';

export const SearchBar = props => {

    console.log("HELLO", props);
    const { onSearch } = props;
    const [name, setName] = useState('');

    const handleChange = (e) => {
        setName(e.target.value);
    }


    return (
        <div className={styles.form}>
            <div className={styles.column}>
                <h2>Name or Number</h2>
                <div className={styles.row}>
                    <input
                        className={styles.searchInput}
                        type="search"
                        onChange={handleChange}
                        value={name}
                    />
                    <button
                        className={styles.button}
                        onClick={() => onSearch(name)}
                    >Search</button>

                </div>
            </div>
        </div>
    );
}